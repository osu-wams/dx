import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Types } from '@osu-wams/lib';
import nanoid from 'nanoid';
import { State, Errors } from '@osu-wams/hooks';

const { messagesState, showMessage } = State;

export const useApplicationMessages = () => {
  const setMessages = useSetRecoilState(messagesState);
  const message = useRecoilValue(showMessage);

  /**
   * Update messageState setting the message visibility to false, this causes
   * the showMessage selector to return the next visible message
   * @param message the message to be dismissed
   */
  const dismissMessage = (message: Types.Message) => {
    setMessages((messages) => {
      if (!messages.length) return [];
      const dismissedMessage = { ...message, visible: false };
      if (messages.length === 1) return [dismissedMessage];

      const index = messages.findIndex((m) => m.id === message.id);
      if (!index) return [dismissedMessage, ...messages.slice(index + 1)];

      // slice around target message, setting its visibility without mutation
      return [
        ...messages.slice(0, index),
        {
          ...message,
          visible: false,
        },
        ...messages.slice(index + 1),
      ];
    });
  };

  /**
   * Update messagesState to include a new visible message with a unique ID, this causes
   * the showMessage selector to return this message as being visible.
   * @param message the message to add to the top of the stack
   */
  const addMessage = (message: Types.Message) => {
    if (message.type !== 'success' && message.type !== 'info') {
      Errors.postAppMessageError(message);
    }
    setMessages((messages) => [
      {
        ...message,
        id: nanoid(),
      },
      ...messages,
    ]);
  };

  return { message, addMessage, dismissMessage };
};
