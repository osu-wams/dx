import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import AnnouncementContainer from '../AnnouncementContainer';
import { mockGAEvent } from '../../setupTests';
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
    const { getByText, queryByText, getAllByTestId } = render(
      <AnnouncementContainer page="academics" />
    );
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getByText(/Every Page Announcement Title/)).toBeInTheDocument();
    expect(getByText(/Academics Announcement Title/)).toBeInTheDocument();
    expect(queryByText(/Finances Announcement Title/)).not.toBeInTheDocument();
    expect(queryByText(/Employee Announcement Title/i)).not.toBeInTheDocument();
  });

  it('should track clicks to annoucements', async () => {
    const { getAllByTestId, getByText } = render(<AnnouncementContainer page="finances" />);
    await waitForElement(() => getAllByTestId('eventcard'));
    const everyPageAnnouncement = getByText('Every Page Announcement Link');
    const academicAnnouncement = getByText('Academics Announcement Link');
    fireEvent.click(everyPageAnnouncement);
    fireEvent.click(academicAnnouncement);
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
    const { getByText, queryByText, getAllByTestId } = render(
      <AnnouncementContainer page="finances" />
    );
    await waitForElement(() => getAllByTestId('eventcard'));
    expect(getByText(/Every Page Announcement Title/)).toBeInTheDocument();
    expect(getByText(/Finances Announcement Title/)).toBeInTheDocument();
    expect(queryByText(/Academics Announcement Title/)).not.toBeInTheDocument();
    expect(queryByText(/Employee Announcement Title/i)).not.toBeInTheDocument();
  });

  it('should track clicks to annoucements', async () => {
    const { getAllByTestId, getByText } = render(<AnnouncementContainer page="finances" />);
    await waitForElement(() => getAllByTestId('eventcard'));
    const everyPageAnnouncement = getByText('Every Page Announcement Link');
    const financeAnnouncement = getByText('Finances Announcement Link');
    fireEvent.click(everyPageAnnouncement);
    fireEvent.click(financeAnnouncement);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });
});
