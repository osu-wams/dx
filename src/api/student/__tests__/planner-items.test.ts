import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import plannerItems from '../__mocks__/plannerItems.data';
import { usePlannerItems } from '..';

const mockAxios = new MockAdapter(axios);
const initialState = { data: [], loading: true, error: false };
const errorState = { data: [], loading: false, error: true };
const url = /api\/student\/planner-items/;

describe('useGrades hook', () => {
  it('should have expected data', async () => {
    mockAxios.onGet(url).reply(200, plannerItems.data);
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItems(() => {}));
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(plannerItems);
  });

  it('should report an error if the server fails', async () => {
    mockAxios.onGet(url).reply(500);
    const { result, waitForNextUpdate } = renderHook(() => usePlannerItems(() => {}));
    expect(result.current).toMatchObject(initialState);
    await waitForNextUpdate();
    expect(result.current).toMatchObject(errorState);
  });
});
