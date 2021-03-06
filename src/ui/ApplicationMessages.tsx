import React from 'react';
import Portal from '@reach/portal';
import styled, { ThemeContext } from 'styled-components/macro';
import {
  faExclamationTriangle,
  faCheckCircle,
  faInfoCircle,
  faBomb,
} from '@fortawesome/pro-light-svg-icons';
import { Types } from '@osu-wams/lib';
import { useApplicationMessagesState } from '@osu-wams/hooks';
import { fontSize, borderRadius, spacing, shadows } from '@osu-wams/theme';
import Icon from './Icon';
import { CloseButton } from './Button';

const ApplicationMessages = () => {
  const themeContext = React.useContext(ThemeContext);
  const { message, dismissMessage } = useApplicationMessagesState();

  const iconType = (type: Types.MessageType) => {
    switch (type) {
      case 'success':
        return faCheckCircle;
      case 'warn':
        return faExclamationTriangle;
      case 'error':
        return faBomb;
      default:
        return faInfoCircle;
    }
  };

  return message ? (
    <Portal>
      <MessageWrapper id={message.id} type={message.type ?? 'info'}>
        <Header>
          <Icon
            icon={iconType(message.type)}
            color={
              themeContext.message[message.type]?.header.color ??
              themeContext.message.info.header.color
            }
          />
          <Title>{message.title}</Title>
          <CloseButton onClick={() => dismissMessage(message)} />
        </Header>
        {message.body}
      </MessageWrapper>
    </Portal>
  ) : null;
};

type messageType = {
  type: Types.MessageType;
};

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: -${spacing.large};
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: ${fontSize[16]};
  flex-grow: 1;
  padding-left: ${spacing.medium};
`;

const MessageWrapper = styled.div<messageType>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  border: solid 3px hsla(0, 0%, 0%, 0.25);
  border-color: ${({ theme, type }) =>
    theme.message[type]?.border.color ?? theme.message.info.border.color};
  box-shadow: ${shadows[1]};
  border-radius: ${borderRadius[8]};
  padding: 0 ${spacing.large} ${spacing.large};
  background: ${({ theme }) => theme.message.background};
  ${Title} {
    color: ${({ theme, type }) =>
      theme.message[type]?.header.color ?? theme.message.info.header.color};
  }
`;

export { ApplicationMessages };
