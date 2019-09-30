import axios from 'axios';
import useAPICall from '../useAPICall';

const getPerson = (): Promise<IPersons> => axios.get(`/api/persons`).then(res => res.data);
const usePerson = () => useAPICall<IPersons | null>(getPerson, undefined, data => data, null)

export interface IPersons {
  id: string;
  type: string;
  attributes: IPersonsAttributes;
  links: { self: string };
}

export interface IPersonsAttributes {
  birthDate: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  previousRecords: [];
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
