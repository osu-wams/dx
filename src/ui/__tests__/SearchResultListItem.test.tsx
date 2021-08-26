/* eslint-disable testing-library/no-node-access */
import React from 'react';
import Fuse from 'fuse.js';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import SearchResultListItem from '../ApplicationSearch/SearchResultListItem';
import { ITSystemStatus } from '../../features/it-systems-status/ITSystemStatus';
import { State, Resources, Trainings, Student, User } from '@osu-wams/hooks';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const { resourcesData } = Resources.mockResources;
import { mockGAEvent } from 'src/setupTests';

const training = Trainings.mockTrainings.data[0];
const resource = resourcesData.data[0];
const course = Student.CourseSchedule.mockCourseSchedule.courseScheduleHookData.data[0];
const notification = User.mockUser.userMessage;

window.open = jest.fn();

describe('with a resource (typical) search result item', () => {
  const { id, title, audiences, locations, link } = resource;
  const resourceResult: Fuse.FuseResult<State.SearchItem> = {
    item: {
      attr: { resource },
      id,
      title,
      type: 'Resource',
      audience: audiences,
      campuses: locations,
      link: { href: link },
      subText: { value: 'Some subtext here' },
    },
    refIndex: 1,
  };
  it('renders with an external link title', async () => {
    render(<SearchResultListItem searchResult={resourceResult} />);
    const link = await screen.findByText('Bend Testo Success Center', { selector: 'a' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://success.oregonstate.edu/');
  });
  it('renders with an external link bubble with icon', async () => {
    render(<SearchResultListItem searchResult={resourceResult} />);
    const bubble = await screen.findByText('Resource', { selector: 'span' });
    expect(bubble).toBeInTheDocument();
    expect(bubble.lastChild).toMatchSnapshot();
  });
  it('renders with a simple subtext', async () => {
    render(<SearchResultListItem searchResult={resourceResult} />);
    const subtext = await screen.findByText('Some subtext here', { selector: 'div' });
    expect(subtext).toBeInTheDocument();
  });

  it('renders without a modal', async () => {
    render(<SearchResultListItem searchResult={resourceResult} />);
    const link = await screen.findByText('Bend Testo Success Center', { selector: 'a' });
    userEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
    expect(screen.queryByText('Close', { selector: 'span' })).not.toBeInTheDocument();
  });
});

describe('with a training search result item', () => {
  const { id, title } = training;
  const trainingResult: Fuse.FuseResult<State.SearchItem> = {
    item: {
      attr: { training },
      id,
      title,
      type: 'Training',
      audience: ['employee'],
      link: { modal: true },
      subText: { html: ['tag 1', 'tag 2'].join(' &bull; ') },
    },
    refIndex: 1,
  };

  it('renders with an internal link title', async () => {
    render(<SearchResultListItem searchResult={trainingResult} />);
    const link = await screen.findByText('Play nice with others', { selector: 'a' });
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute('href');
  });

  it('renders with html subtext', async () => {
    render(<SearchResultListItem searchResult={trainingResult} />);
    const subtext = await screen.findByText(/tag 1 .* tag 2/, { selector: 'div' });
    expect(subtext).toBeInTheDocument();
  });

  it('toggles the modal', async () => {
    render(<SearchResultListItem searchResult={trainingResult} />);
    const link = await screen.findByText('Play nice with others', { selector: 'a' });
    userEvent.click(link);
    expect(await screen.findByTestId('training-modal')).toBeInTheDocument();
    const close = await screen.findByText('Close', { selector: 'span' });
    userEvent.click(close);
    expect(screen.queryByTestId('training-modal')).not.toBeInTheDocument();
  });
});

describe('with a course search result item', () => {
  const {
    id,
    attributes: { courseSubjectNumber, courseTitle },
  } = course;
  const courseResult: Fuse.FuseResult<State.SearchItem> = {
    item: {
      attr: { courses: { ...course } },
      id,
      title: courseSubjectNumber,
      type: 'Current Course',
      audience: ['employee'],
      link: { modal: true },
      subText: { value: courseTitle },
    },
    refIndex: 1,
  };

  it('toggles the modal', async () => {
    render(<SearchResultListItem searchResult={courseResult} />);
    const link = await screen.findByText('WR214', { selector: 'a' });
    userEvent.click(link);
    expect(await screen.findByTestId('course-dialog')).toBeInTheDocument();
    const close = await screen.findByText('Close', { selector: 'span' });
    userEvent.click(close);
    expect(screen.queryByTestId('course-dialog')).not.toBeInTheDocument();
  });
});

describe('with a notification search result item', () => {
  const { messageId, title } = notification;
  const notificationResult: Fuse.FuseResult<State.SearchItem> = {
    item: {
      attr: { notification },
      id: messageId,
      title,
      type: 'Notification',
      link: { modal: true },
      subText: { value: 'Received at April 20, 2000' },
    },
    refIndex: 1,
  };

  it('toggles the modal', async () => {
    render(<SearchResultListItem searchResult={notificationResult} />);
    const link = await screen.findByText('Title', { selector: 'a' });
    userEvent.click(link);
    expect(await screen.findByTestId('notification-modal')).toBeInTheDocument();
    const close = await screen.findByText('Close', { selector: 'span' });
    userEvent.click(close);
    expect(screen.queryByTestId('notification-modal')).not.toBeInTheDocument();
  });
});

describe('with a resource (typical) search result item', () => {
  const resource = resourcesData.data[7];
  const { id, title, audiences, locations, link } = resource;
  const resourceResult: Fuse.FuseResult<State.SearchItem> = {
    item: {
      attr: { resource },
      id,
      title,
      type: 'Resource',
      audience: audiences,
      campuses: locations,
      link: { href: link },
      subText: { value: 'Some subtext here version 2' },
    },
    refIndex: 1,
  };

  it('resource with down IT system should display warning icon and dialog', async () => {
    render(
      <>
        <ITSystemStatus />
        <SearchResultListItem searchResult={resourceResult} />
      </>
    );
    const link = await screen.findByText('Box', { selector: 'a' });
    expect(link).toBeInTheDocument();

    expect(await screen.findByTestId('warning-icon')).toBeInTheDocument();
    userEvent.click(link);
    expect(mockGAEvent).toHaveBeenCalledTimes(3);

    expect(await screen.findByText(/Resource may be unavailable/i)).toBeInTheDocument();
    expect(await screen.findByText(/Performance Issues./i)).toBeInTheDocument();

    // Close modal to trigger analytics and confirm modal content is no longer present
    userEvent.click(await screen.findByText('Close'));
    expect(mockGAEvent).toHaveBeenCalledTimes(4);
    expect(screen.queryByText(/Performance Issues./i)).not.toBeInTheDocument();
  });

  it('resource with down IT system should display warning icon and allow users click through it', async () => {
    render(
      <>
        <ITSystemStatus />
        <SearchResultListItem searchResult={resourceResult} />
      </>
    );

    expect(await screen.findByTestId('warning-icon')).toBeInTheDocument();
    userEvent.click(await screen.findByText('Box', { selector: 'a' }));
    expect(mockGAEvent).toHaveBeenCalledTimes(3);

    expect(await screen.findByText(/Resource may be unavailable/i)).toBeInTheDocument();

    // Continues to resource and it's tracked in Google Analytics
    userEvent.click(await screen.findByText('Continue to resource'));
    expect(mockGAEvent).toHaveBeenCalledTimes(4);
  });
});
