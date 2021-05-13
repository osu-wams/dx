import { Types } from '@osu-wams/lib';
import { QueryClient } from 'react-query';
import { User } from '@osu-wams/hooks';

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

export const dismissAll = (queryClient: QueryClient) => {
  User.updateUserMessage({ status: 'READ' }).then(() => {
    queryClient.invalidateQueries('userMessages');
  });
};
