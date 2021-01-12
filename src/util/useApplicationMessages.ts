import { useSetRecoilState, useRecoilValue } from 'recoil';
import { messagesState, showMessage } from 'src/state/messages';
import { Types } from '@osu-wams/lib';
import uuid from 'uuid';

export const useApplicationMessages = () => {
  const setMessages = useSetRecoilState(messagesState);
  const message = useRecoilValue(showMessage);

  // Update messageState setting the message visibility to false, this causes
  // the showMessage selector to return the next visible message
  const dismissMessage = (message: Types.Message) => {
    setMessages((messages) => {
      if (!messages.length) return [];
      const dismissedMessage = { ...message, visible: false };
      if (messages.length === 1) return [dismissedMessage];

      const index = messages.findIndex((m) => m.id === message.id);
      if (!index) return [dismissedMessage, ...messages];

      // slice around target message, setting its visibility without mutation
      return [
        ...messages.slice(0, index),
        {
          ...message,
          visible: false,
        },
        ...messages.slice(index),
      ];
    });
  };

  // Update messagesState to include a new visible message with a unique ID, this causes
  // the showMessage selector to return this message as being visible
  const addMessage = (message: Types.Message) => {
    setMessages((messages) => [
      {
        ...message,
        id: uuid.v4(),
        visible: true,
      },
      ...messages,
    ]);
  };

  return { message, addMessage, dismissMessage };
};
