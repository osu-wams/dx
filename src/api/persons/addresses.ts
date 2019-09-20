import axios from 'axios';
import useAPICall from '../useAPICall';

const getMailingAddress = (): Promise<IMailingAddress> =>
  axios.get(`/api/persons/addresses`).then(res => res.data);
const useMailingAddress = () =>
  useAPICall<IMailingAddress | null>(getMailingAddress, undefined, data => data, null);

export interface IMailingAddress {
  id: string;
  type: string;
  attributes: IMailingAddressAttributes;
  links: string | null;
}

export interface IMailingAddressAttributes {
  addressType: string;
  addressTypeDescription: string;
  addressLine1: string | null;
  addressLine2: string | null;
  addressLine3: string | null;
  addressLine4: string | null;
  houseNumber: string | null;
  city: string;
  stateCode: string;
  state: string;
  postalCode: string;
  countyCode: string;
  county: string;
  nationCode: string | null;
  nation: string | null;
  lastModified: string;
}

export { useMailingAddress };
