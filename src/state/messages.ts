import { atom, selector } from 'recoil';
import { Types } from '@osu-wams/lib';

export const messagesState = atom<Types.Message[]>({
  key: 'messages',
  default: [],
});

/**
 * messagesState works like a stack and we show on the the upper most message that is still
 * visible=true. This leaves open the possibility for multiple messages but enforcing
 * that only one will ever be displayed until it is dismissed by the user.
 * TODO: The user experience for this means that a user could potentially see a series of messages one after another until all are dismissed.
 */
export const showMessage = selector<Types.Message | undefined>({
  key: 'showMessage',
  get: ({ get }) => {
    const messages = get(messagesState);
    if (!messages.length) return;
    return messages.filter((m) => m.visible)[0];
  },
});
