import axios from 'axios';
import useAPICall from './useAPICall';
import { useEffect, useState } from 'react';

export const CAMPUS_CODES = {
  bend: 'B',
  corvallis: 'C',
  ecampus: 'DSC'
};

export interface IUserClassificationAttributes {
  level: string;
  campus: string;
  campusCode: string;
  classification: string;
  isInternational: boolean;
}

export interface IUserClassification {
  attributes?: IUserClassificationAttributes;
  id: string;
}

export interface IUser {
  email?: string;
  isCanvasOptIn?: boolean;
  classification?: IUserClassification;
}

export interface IUserState {
  data: IUser | null;
  error: boolean;
  loading: boolean;
  isCanvasOptIn?: boolean;
}

const getUser = (): Promise<IUser> =>
  axios
    .get('/api/user')
    .then(res => res.data)
    .catch(e => {
      window.location.href = '/login';
      return e;
    });

/**
 * Get a list of the users classifications
 * @param user - the user to determine classifications for
 */
export const userClassifications = (user: IUser): string[] => {
  const results: string[] = [];
  if (user.classification !== undefined && user.classification.attributes !== undefined) {
    const { level, campus, classification, isInternational } = user.classification.attributes;
    if (level === 'Graduate') results.push('Graduate Student');
    if (classification === 'Freshman') results.push('First Year');
    if (isInternational) results.push('International Student');
    if (campus) results.push(campus);
  }
  return results;
};

export const atCampus = (user: IUser, campusCode: string): boolean => {
  return (
    user.classification !== undefined &&
    user.classification.attributes !== undefined &&
    user.classification.attributes.campusCode.toLowerCase() === campusCode.toLowerCase()
  );
};

export const useUser = () => {
  const [user, setUser] = useState<IUserState>({
    data: {},
    error: false,
    loading: false,
    isCanvasOptIn: false
  });
  const u = useAPICall<IUser>(getUser, undefined, data => data, {}, false);

  useEffect(() => {
    setUser({
      data: u.data,
      error: u.error,
      loading: u.loading,
      isCanvasOptIn: u.data.isCanvasOptIn
    });
  }, [u.data, u.error, u.loading]);

  return {
    error: user!.error,
    data: user!.data,
    loading: user!.loading,
    isCanvasOptIn: user!.data!.isCanvasOptIn,
    setUser
  };
};
