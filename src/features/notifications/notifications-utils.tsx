import { Types } from '@osu-wams/lib';
import { queryCache } from 'react-query';
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

export const dismissAll = () => {
  User.updateUserMessage({ status: 'READ' }).then(() => {
    queryCache.invalidateQueries('userMessages');
  });
};
