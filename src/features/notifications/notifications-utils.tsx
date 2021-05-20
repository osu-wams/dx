import { Types } from '@osu-wams/lib';
import { QueryClient } from 'react-query';
import { User } from '@osu-wams/hooks';

// TODO: Move this to dx-monorepo as this feature is implemented in dx-mobile
export const markNotificationRead = (
  prevNotifications: Types.UserMessagesState,
  notificationId: string
) => {
  const newNotifications = prevNotifications.data.map((noti) => {
    if (noti.messageId === notificationId) {
      return {
        ...noti,
        status: 'READ',
      };
    } else {
      return noti;
    }
  });
  return {
    data: newNotifications,
    isLoading: prevNotifications.isLoading,
    isSuccess: prevNotifications.isSuccess,
  };
};

// TODO: Move this to dx-monorepo as this feature is implemented in dx-mobile
export const dismissAll = (queryClient: QueryClient) => {
  User.updateUserMessage({ status: 'READ' }).then(() => {
    queryClient.invalidateQueries('/api/user/messages');
  });
};
