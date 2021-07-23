import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Person } from '@osu-wams/hooks';
import CovidCompliance from '../CovidCompliance';
import { mockGAEvent } from 'src/setupTests';

const mockMedical = Person.Medical.mockMedical;
const mockUseMedical = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useMedical: () => mockUseMedical(),
  };
});

describe('<CovidCompliance />', () => {
  beforeEach(() => {
    mockUseMedical.mockReturnValue(mockMedical);
  });

  it('should have title: "Covid Vaccination"', () => {
    render(<CovidCompliance />);

    expect(screen.getByText(/covid vaccination/i, { selector: 'h2 > span' })).toBeInTheDocument();
  });

  it('should have a positive vaccination message', () => {
    render(<CovidCompliance />);

    expect(screen.getByText(/you are in compliance/i)).toBeInTheDocument();
  });

  it('should find links to become compliant', async () => {
    mockUseMedical.mockReturnValue({ ...mockMedical, data: [] });
    render(<CovidCompliance />);
    const getVaccinated = screen.getByText(/get the vaccination/i);
    const register = screen.getByText(/enter your vaccine information/i);
    const decline = screen.getByText(/complete the declination form/i);
    userEvent.click(getVaccinated);
    expect(mockGAEvent).toHaveBeenCalledTimes(1);
    userEvent.click(register);
    expect(mockGAEvent).toHaveBeenCalledTimes(2);
    userEvent.click(decline);
    expect(mockGAEvent).toHaveBeenCalledTimes(3);
  });

  it('should show a negative vaccination message', async () => {
    mockUseMedical.mockReturnValue({ ...mockMedical, data: [] });
    render(<CovidCompliance />);

    expect(screen.getByText(/you are not in compliance/i)).toBeInTheDocument();
  });
});
