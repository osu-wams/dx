import axios from 'axios';
import useAPICall from '../useAPICall';

const getPerson = (): Promise<IPersons> => axios.get(`/api/persons`).then(res => res.data);
const usePerson = () =>
  useAPICall<IPersonsAttributes | null>(
    getPerson,
    undefined,
    data => ({ ...data.attributes, id: data.id }),
    null
  );

export interface IPersons {
  id: string;
  type: string;
  attributes: IPersonsAttributes;
  links: { self: string };
}

export interface IPersonsAttributes {
  id: string;
  birthDate: string;
  firstName: string | null;
  middleName: string | null;
  lastName: string;
  displayFirstName: string | null;
  displayMiddleName: string | null;
  displayLastName: string | null;
  previousRecords: [] | never;
  homePhone: string | null;
  alternatePhone: string | null;
  osuUID: string;
  primaryPhone: string | null;
  mobilePhone: string | null;
  currentStudent: boolean;
  currentEmployee: boolean;
  employeeStatus: string;
  email: string;
  username: string;
  confidential: boolean;
}

export { usePerson };
