import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import AnnouncementContainer from '../AnnouncementContainer';
import { mockGAEvent } from 'src/setupTests';
import { Announcements } from '@osu-wams/hooks';

const { academicAnnouncementResult, financialAnnouncementResult } = Announcements.mockAnnouncements;
const mockUseAnnouncements = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useAnnouncements: () => mockUseAnnouncements()
  };
});

describe('<AnnouncementContainer> as Academics', () => {
  beforeEach(() => {
    mockUseAnnouncements.mockReturnValue(academicAnnouncementResult);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should show Academic announcements and untagged', async () => {
    const { getByText, queryByText, findAllByTestId } = render(
      <AnnouncementContainer page="academics" />
    );
    await findAllByTestId('eventcard');
    expect(getByText(/Every Page Announcement Title/)).toBeInTheDocument();
    expect(getByText(/Academics Announcement Title/)).toBeInTheDocument();
    expect(queryByText(/Finances Announcement Title/)).toBeNull();
    expect(queryByText(/Employee Announcement Title/i)).toBeNull();
  });

  it('should track clicks to annoucements', async () => {
    const { findAllByTestId, getByText } = render(<AnnouncementContainer page="finances" />);
    await findAllByTestId('eventcard');
    const everyPageAnnouncement = getByText('Every Page Announcement Link');
    const academicAnnouncement = getByText('Academics Announcement Link');
    userEvent.click(everyPageAnnouncement);
    userEvent.click(academicAnnouncement);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('<AnnouncementContainer> as Finances', () => {
  beforeEach(() => {
    mockUseAnnouncements.mockReturnValue(financialAnnouncementResult);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should show Finance announcements and untagged', async () => {
    const { getByText, queryByText, findAllByTestId } = render(
      <AnnouncementContainer page="finances" />
    );
    await findAllByTestId('eventcard');
    expect(getByText(/Every Page Announcement Title/)).toBeInTheDocument();
    expect(getByText(/Finances Announcement Title/)).toBeInTheDocument();
    expect(queryByText(/Academics Announcement Title/)).toBeNull();
    expect(queryByText(/Employee Announcement Title/i)).toBeNull();
  });

  it('should track clicks to annoucements', async () => {
    const { findAllByTestId, getByText } = render(<AnnouncementContainer page="finances" />);
    await findAllByTestId('eventcard');
    const everyPageAnnouncement = getByText('Every Page Announcement Link');
    const financeAnnouncement = getByText('Finances Announcement Link');
    userEvent.click(everyPageAnnouncement);
    userEvent.click(financeAnnouncement);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});
