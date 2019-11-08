import React from 'react';
import { fireEvent, waitForElement, cleanup } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { ScheduleCardCourses } from '../schedule/ScheduleCardCourses';
import mockCourses from '../../api/student/__mocks__/courses.data';

describe('<ScheduleCardCourses />', () => {
  it('Renders with no courses', () => {
    render(<ScheduleCardCourses selectedCourses={[]} />);
  })

  it('Renders both with courses', () => {
    render(<ScheduleCardCourses selectedCourses={mockCourses.data} />);
  });

  it('Specific course loads on click, close button closes', async () => {
    const { queryAllByText, getByText, getByTestId, queryByTestId } = render(
      <ScheduleCardCourses selectedCourses={mockCourses.data} />
    );
    const wrCourses = await waitForElement(() => queryAllByText('WR'))
    expect(wrCourses.length).toBeGreaterThan(0) // since queryAll can return an empty array, we want to make sure that didn't happen
    const OpSysBtn = wrCourses[0] // we really don't care what course we click for this test
    fireEvent.click(OpSysBtn);
    const courseDialog = await waitForElement(() => getByTestId('course-dialog'));
    expect(courseDialog).toBeInTheDocument();
    expect(courseDialog).toHaveTextContent(/WR/i);
    const closeBtn = await waitForElement(() => getByText('Close'));
    fireEvent.click(closeBtn);
    expect(queryByTestId('course-dialog')).toBeNull();
  });
});
