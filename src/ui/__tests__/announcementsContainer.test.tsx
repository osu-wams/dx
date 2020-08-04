import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { render, alterMock } from 'src/util/test-utils';
import AnnouncementContainer from '../AnnouncementContainer';
import { mockGAEvent } from 'src/setupTests';
import { Announcements } from '@osu-wams/hooks';
import { ACADEMIC_ANNOUNCEMENTS_API } from 'src/mocks/apis';
const { financialAnnouncementResult } = Announcements.mockAnnouncements;

describe('<AnnouncementContainer> as Academics', () => {
  beforeEach(async () => {
    render(<AnnouncementContainer page="academics" />);
    await screen.findAllByTestId('eventcard');
  });
  it('Should show Academic announcements and untagged', async () => {
    expect(screen.getByText(/Every Page Announcement Title/)).toBeInTheDocument();
    expect(screen.getByText(/Academics Announcement Title/)).toBeInTheDocument();
    expect(screen.queryByText(/Finances Announcement Title/)).toBeNull();
    expect(screen.queryByText(/Employee Announcement Title/i)).toBeNull();
  });

  it('should track clicks to annoucements', async () => {
    const everyPageAnnouncement = screen.getByText('Every Page Announcement Link');
    const academicAnnouncement = screen.getByText('Academics Announcement Link');
    userEvent.click(everyPageAnnouncement);
    userEvent.click(academicAnnouncement);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});

describe('<AnnouncementContainer> as Finances', () => {
  beforeEach(async () => {
    alterMock(ACADEMIC_ANNOUNCEMENTS_API, financialAnnouncementResult.data);
    render(<AnnouncementContainer page="finances" />);
    await screen.findAllByTestId('eventcard');
  });

  it('Should show Finance announcements and untagged', async () => {
    expect(screen.getByText(/Every Page Announcement Title/)).toBeInTheDocument();
    expect(screen.getByText(/Finances Announcement Title/)).toBeInTheDocument();
    expect(screen.queryByText(/Academics Announcement Title/)).toBeNull();
    expect(screen.queryByText(/Employee Announcement Title/i)).toBeNull();
  });

  it('should track clicks to annoucements', async () => {
    const everyPageAnnouncement = screen.getByText('Every Page Announcement Link');
    const financeAnnouncement = screen.getByText('Finances Announcement Link');
    userEvent.click(everyPageAnnouncement);
    userEvent.click(financeAnnouncement);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});
