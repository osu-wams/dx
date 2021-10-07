import React from 'react';
import { renderWithAllContexts as render } from 'src/util/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Person, mockGrouper, State } from '@osu-wams/hooks';
import CovidCompliance from '../CovidCompliance';
import { mockGAEvent } from 'src/setupTests';

const mockMedical = Person.Medical.mockMedical;
const mockedGrouper = {
  state: State.covidvacStudentState,
  value: {
    isLoading: false,
    isSuccess: true,
    data: mockGrouper,
  },
};
const mockPerson = Person.Persons.mockPersons.personsData;
const mockUseMedical = jest.fn();
const mockUsePerson = jest.fn();

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useMedical: () => mockUseMedical(),
    usePerson: () => mockUsePerson(),
  };
});

describe('<CovidCompliance />', () => {
  beforeEach(() => {
    mockUseMedical.mockReturnValue(mockMedical);
    mockUsePerson.mockReturnValue(mockPerson);
  });

  it('should not render for users not in grouper group students', () => {
    render(<CovidCompliance />, {
      initialStates: [
        {
          state: State.covidvacStudentState,
          value: {
            isLoading: false,
            isSuccess: true,
            data: [],
          },
        },
    ],
  });

    expect(
      screen.queryByText(/covid vaccination/i, { selector: 'h2 > span' })
    ).not.toBeInTheDocument();
  });

  it('should have title: "Covid Vaccination"', () => {
    render(<CovidCompliance />);

    expect(screen.getByText(/covid vaccination/i, { selector: 'h2 > span' })).toBeInTheDocument();
  });

  it('should find links to become compliant', async () => {
    mockUseMedical.mockReturnValue({ ...mockMedical, data: [] });
    render(<CovidCompliance />, {
      initialStates: [
        mockedGrouper,
      ],
    });
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
    mockUseMedical.mockReturnValue({ ...mockMedical, data: [] });
    render(<CovidCompliance />, {
      initialStates: [
        mockedGrouper,
      ],
    });

    expect(screen.getByText(/you are not in compliance/i)).toBeInTheDocument();
  });
});
