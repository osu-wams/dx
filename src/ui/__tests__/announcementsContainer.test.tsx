import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render } from '../../util/test-utils';
import AnnouncementContainer from '../AnnouncementContainer';
import {
  AcademicsAnnouncementsData,
  FinancesAnnouncementsData
} from '../__mocks__/announcementsContainer.data';
import { mockGAEvent } from '../../setupTests';

const mockUseAnnouncements = jest.fn();

jest.mock('../../api/announcements', () => {
  return {
    ...jest.requireActual('../../api/announcements'),
    useAnnouncements: () => mockUseAnnouncements()
  };
});
describe('<AnnouncementContainer> as Academics', () => {
  beforeEach(() => {
    mockUseAnnouncements.mockReturnValue(AcademicsAnnouncementsData);
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
    mockUseAnnouncements.mockReturnValue(FinancesAnnouncementsData);
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
