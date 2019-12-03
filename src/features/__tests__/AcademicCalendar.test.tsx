import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import { render, mockAppContext } from '../../util/test-utils';
import { academicCalendar3, academicCalendar6 } from '../../api/__mocks__/academicCalendar.data';
import AcademicCalendar from '../AcademicCalendar';
import { mockGAEvent } from '../../setupTests';

const mockUseAcademicCalendar = jest.fn();

jest.mock('../../api/events', () => ({
  useAcademicCalendarEvents: () => mockUseAcademicCalendar()
}));

describe('<AcademicCalendar />', () => {
  // Set mock function result before running any tests
  beforeEach(() => {
    mockUseAcademicCalendar.mockReturnValue(academicCalendar6);
  });

  it('should find the "Testo Event" as a title', async () => {
    const { getByText } = render(<AcademicCalendar />);
    const eventTitle = await waitForElement(() => getByText('Testo Event'));
    expect(eventTitle).toBeInTheDocument();
  });

  it('can click on footer and event to send data to analytics', async () => {
    const { getByText } = render(<AcademicCalendar />);
    const eventTitle = await waitForElement(() => getByText('Testo Event'));
    fireEvent.click(eventTitle);
    expect(mockGAEvent).toHaveBeenCalled();

    const viewCalendar = await waitForElement(() =>
      getByText('View more in the academic calendar')
    );
    fireEvent.click(viewCalendar);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
  });

  it('should have "3" as a value when only 3 calendar events are present', async () => {
    mockUseAcademicCalendar.mockReturnValue(academicCalendar3);
    const { getAllByText } = render(<AcademicCalendar />);
    await waitForElement(() => getAllByText('3'));
  });

  it('should return "No Calendar Events" when no events are loaded', async () => {
    mockUseAcademicCalendar.mockReturnValue({ data: [], loading: false, error: false });
    const { getByText } = render(<AcademicCalendar />);
    await waitForElement(() => getByText('No Calendar Events'));
  });
});

describe('with an InfoButton in the CardFooter', () => {
  const validIinfoButtonId = 'academic-calendar';
  beforeEach(() => {
    mockUseAcademicCalendar.mockReturnValue(academicCalendar6);
  });

  test('does not display the button when the infoButtonData is missing it', async () => {
    const { queryByTestId } = render(<AcademicCalendar />, {
      appContext: {
        ...mockAppContext,
        infoButtonData: [{ id: 'invalid-id', content: 'content', title: 'title' }]
      }
    });

    const element = queryByTestId(validIinfoButtonId);
    expect(element).not.toBeInTheDocument();
  });

  test('displays the button when the infoButtonData is included', async () => {
    const { getByTestId } = render(<AcademicCalendar />, {
      appContext: {
        ...mockAppContext,
        infoButtonData: [{ id: validIinfoButtonId, content: 'content', title: 'title' }]
      }
    });

    const element = await waitForElement(() => getByTestId(validIinfoButtonId));
    expect(element).toBeInTheDocument();
  });
});
