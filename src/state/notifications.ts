import { atom, selectorFamily } from 'recoil';
import { Types } from '@osu-wams/lib';

/**
 * Local state for all the user messages
 */
export const userMessagesState = atom<Types.UserMessagesState>({
  key: 'userMessagesState',
  default: { data: [], isLoading: true, isSuccess: false },
});

/**
 * Allows to filter notifications by their status or not at all
 */
export const filteredNotifications = selectorFamily<Types.UserMessagesState, string>({
  key: 'filteredNotifications',
  get: (filter) => ({ get }) => {
    const notifications = get(userMessagesState);

    let filtered = notifications.data;
    if (notifications && notifications.data && notifications.data.length > 0) {
      switch (filter) {
        case 'unread':
          filtered = notifications.data.filter(
            (m: Types.UserMessage) => m.status.toLowerCase() !== 'read'
          );
          break;

        case 'read':
          filtered = notifications.data.filter(
            (m: Types.UserMessage) => m.status.toLowerCase() === 'read'
          );
          break;
      }
    }
    return {
      ...notifications,
      data: filtered,
    };
  },
});
