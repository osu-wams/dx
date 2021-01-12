import { atom, selector } from 'recoil';
import { Types } from '@osu-wams/lib';

export const messagesState = atom<Types.Message[]>({
  key: 'messages',
  default: [],
});

export const showMessage = selector<Types.Message | undefined>({
  key: 'showMessage',
  get: ({ get }) => {
    const messages = get(messagesState);
    if (!messages.length) return;
    return messages.filter((m) => m.visible)[0];
  },
});
