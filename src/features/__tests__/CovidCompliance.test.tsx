import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CovidCompliance from '../CovidCompliance';
import { mockGAEvent } from 'src/setupTests';

const mockUseHasMember = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useHasMember: () => mockUseHasMember(),
  };
});

describe('<CovidCompliance />', () => {
  it('should not render for users not in grouper group students', () => {
    mockUseHasMember.mockReturnValue({ isLoading: false, isSuccess: true, data: false });
    render(<CovidCompliance />);

    expect(
      screen.queryByText(/covid vaccination/i, { selector: 'h2 > span' })
    ).not.toBeInTheDocument();
  });

  it('should have title: "Covid Vaccination"', () => {
    mockUseHasMember.mockReturnValue({ isLoading: false, isSuccess: true, data: true });
    render(<CovidCompliance />);

    expect(screen.getByText(/covid vaccination/i, { selector: 'h2 > span' })).toBeInTheDocument();
  });

  it('should find links to become compliant', async () => {
    mockUseHasMember.mockReturnValue({ isLoading: false, isSuccess: true, data: true });
    render(<CovidCompliance />);

    const getVaccinated = screen.getByText(/get the vaccination/i);
    const register = screen.getByText(/enter your vaccine information/i);
    const decline = screen.getByText(/complete an exemption form/i);
    userEvent.click(getVaccinated);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    userEvent.click(register);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
    userEvent.click(decline);
    expect(mockGAEvent).toHaveBeenCalledTimes(3);
  });

  it('should show a negative vaccination message', async () => {
    mockUseHasMember.mockReturnValue({ isLoading: false, isSuccess: true, data: true });
    render(<CovidCompliance />);

    expect(screen.getByText(/you are not in compliance/i)).toBeInTheDocument();
  });
});
