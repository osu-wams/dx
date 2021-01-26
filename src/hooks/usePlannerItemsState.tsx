import { useEffect } from 'react';
import { Constants, usePlannerItems } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { useRecoilValue, useRecoilState } from 'recoil';
import { plannerItemState, userState } from 'src/state';

export const usePlannerItemsState = () => {
  const user = useRecoilValue<Types.UserState>(userState);
  const api = usePlannerItems({
    ...Constants.REACT_QUERY_DEFAULT_CONFIG,
    enabled: user.isCanvasOptIn,
    retry: false,
    // If the user had previously approved Canvas, but planner-items fails on the server side due to invalid oauth,
    // a 403 is returned to the frontend, the user isCanvasOptIn should be changed to false and the hook disabled, causing the
    // component to render the "Authorize Canvas" button giving the user the ability to opt-in again.
    // @ts-ignore never read
    onError: (err) => {
      const {
        response: { status },
      } = err as any;
      if (user.isCanvasOptIn && status === 403) {
        // This hook needs to reach into the UserState and call the underlying
        // setter on the user object rather than the `setUser` on the
        // recoil state itself.
        user.setUser!((prevUser) => ({
          ...prevUser,
          isCanvasOptIn: false,
          data: { ...prevUser.data, isCanvasOptIn: false },
        }));
      }
    },
  });
  const [plannerItems, setPlannerItems] = useRecoilState(plannerItemState);

  useEffect(() => {
    const { isError, error, isLoading, isSuccess, data } = api;
    if (data && data !== plannerItems.data) {
      setPlannerItems({
        data,
        isLoading,
        error,
        isError,
        isSuccess,
      });
    }
  }, [api.data, api.isSuccess]);

  return { plannerItems, setPlannerItems };
};

export default usePlannerItemsState;
