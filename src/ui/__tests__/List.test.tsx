import React from 'react';
import { render } from 'src/util/test-utils';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemDescription,
  ListItemHeader,
  ListItemText,
} from '../List';
import { faFileAlt } from '@fortawesome/pro-light-svg-icons';
import Icon from '../Icon';
import { Color } from 'src/theme';

const RightIcon = () => (
  <List>
    <ListItem>
      <ListItemContent>
        <ListItemText>
          <ListItemHeader>What is this</ListItemHeader>
          <ListItemDescription>Deiscription</ListItemDescription>
        </ListItemText>
        <Icon icon={faFileAlt} size="lg" color={Color['orange-200']} />
      </ListItemContent>
    </ListItem>
  </List>
);

const LeftRightIcons = () => (
  <List>
    <ListItem>
      <ListItemContent>
        <Icon icon={faFileAlt} size="lg" />
        <ListItemText>
          <ListItemHeader>Turn inj the assignment</ListItemHeader>
          <ListItemDescription>
            CAS171 - Due Feb 15 at 11:59pm
            <br />
            What is going on
          </ListItemDescription>
        </ListItemText>
        <Icon icon={faFileAlt} size="lg" />
      </ListItemContent>
    </ListItem>
  </List>
);

const LeftIcon = () => (
  <List>
    <ListItem>
      <ListItemContent>
        <Icon icon={faFileAlt} />
        <ListItemText>
          <ListItemHeader>What is this</ListItemHeader>
          <ListItemDescription>Deiscription</ListItemDescription>
        </ListItemText>
      </ListItemContent>
    </ListItem>
  </List>
);

test('An icon on the right', () => {
  const { container } = render(<RightIcon />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Icon on both left and right', () => {
  const { container } = render(<LeftRightIcons />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Default style with icon on left', () => {
  const { container } = render(<LeftIcon />);
  expect(container.firstChild).toMatchSnapshot();
});
