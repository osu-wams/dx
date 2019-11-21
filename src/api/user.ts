import axios from 'axios';
import useAPICall from './useAPICall';
import { useEffect, useState } from 'react';
import { defaultTheme } from '../theme/themes';

export const CLASSIFICATIONS = {
  firstYear: 'First Year',
  international: 'International Student',
  graduate: 'Graduate Student'
};

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
  id?: string;
}

export interface IUser {
  email?: string;
  isCanvasOptIn?: boolean;
  classification: IUserClassification;
  audienceOverride: IUserAudienceOverride;
  theme: string;
}

export interface IUserState {
  data: IUser | null;
  error: boolean;
  loading: boolean;
  isCanvasOptIn?: boolean;
}

export interface IUserAudienceOverride {
  campusCode?: string;
  firstYear?: boolean;
  graduate?: boolean;
  international?: boolean;
}

export interface IUserSettings {
  audienceOverride?: IUserAudienceOverride;
  theme?: string;
}

export const initialUser: IUser = {
  classification: {},
  audienceOverride: {},
  theme: defaultTheme
};

const getUser = (): Promise<IUser> =>
  axios
    .get('/api/user')
    .then(res => res.data)
    .catch(e => {
      window.location.href = '/login';
      return e;
    });

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isFirstYear = (user: IUser): boolean => {
  if (user.audienceOverride && user.audienceOverride.firstYear !== undefined) {
    return user.audienceOverride.firstYear;
  }
  return (
    user.classification.attributes !== undefined &&
    user.classification.attributes.classification.toLowerCase() ===
      CLASSIFICATIONS.firstYear.toLowerCase()
  );
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isInternational = (user: IUser): boolean => {
  if (user.audienceOverride && user.audienceOverride.international !== undefined) {
    return user.audienceOverride.international;
  }
  return (
    user.classification.attributes !== undefined && user.classification.attributes.isInternational
  );
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isGraduate = (user: IUser): boolean => {
  if (user.audienceOverride && user.audienceOverride.graduate !== undefined) {
    return user.audienceOverride.graduate;
  }
  return (
    user.classification.attributes !== undefined &&
    user.classification.attributes.level.toLowerCase() === CLASSIFICATIONS.graduate.toLowerCase()
  );
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns the campus name and campus code that the user is associated with
 */
export const usersCampus = (
  user: IUser
): { campusName: string | undefined; campusCode: string } => {
  const { campusCode } = (user.classification && user.classification.attributes) || {
    campusCode: 'C'
  };
  const { campusCode: campusCodeOverride } = user.audienceOverride;
  const selectedCampusCode = campusCodeOverride || campusCode;
  // Find the key name associated to the users campusCode to use for matching in the audiences
  // set for the announcement
  const campusName = Object.keys(CAMPUS_CODES)
    .map(k => k.toLowerCase())
    .find(key => CAMPUS_CODES[key].toLowerCase() === selectedCampusCode.toLowerCase());
  return { campusCode: selectedCampusCode, campusName };
};

/**
 * Detects if the user is associated with any of the audiences that are provided. An audience could be
 * the users campus code or the classifications (both of which take into account the user override settings)
 * @param user the user to inspect
 * @param item a list of audiences to detect
 */
export const hasAudience = (user: IUser, item: { audiences: string[] }): boolean => {
  const foundAudiences: string[] = [];
  const { audiences } = item;
  if (
    (audiences && audiences.length === 0) ||
    ((user.classification === undefined || user.classification.attributes === undefined) &&
      user.audienceOverride === undefined)
  )
    return true;

  const { campusName, campusCode } = usersCampus(user) as {
    campusName: string | undefined;
    campusCode: string;
  };

  if (!campusName) {
    console.error(
      `Expected campus code ${campusCode} not found in configuration, this is an unexpected circumstance that needs to be repaired.`
    );
  } else {
    foundAudiences.push(campusName);
  }

  if (isGraduate(user)) foundAudiences.push(CLASSIFICATIONS.graduate);
  if (isFirstYear(user)) foundAudiences.push(CLASSIFICATIONS.firstYear);
  if (isInternational(user)) foundAudiences.push(CLASSIFICATIONS.international);

  // The user has a classification and the item has audiences specified, return if
  // this users campusCode exists in the audience list.
  return item.audiences.some(a =>
    foundAudiences.map(fa => fa.toLowerCase()).includes(a.toLowerCase())
  );
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
    data: initialUser,
    error: false,
    loading: true,
    isCanvasOptIn: false
  });
  const u = useAPICall<IUser>(getUser, undefined, data => data, initialUser, false);

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

export const postSettings = (settings: IUserSettings): Promise<IUserSettings> =>
  axios
    .post('/api/user/settings', settings)
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });
