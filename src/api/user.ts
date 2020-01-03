import axios from 'axios';
import useAPICall from './useAPICall';
import { useEffect, useState } from 'react';
import { defaultTheme } from '../theme/themes';

export const defaultCampus = 'C';

export const CLASSIFICATIONS = {
  firstYear: ['freshman', 'vet med-first year'],
  graduate: ['graduate', 'cascades partner grad course', 'e-campus graduate course']
};

export const CLASSIFICATION_AUDIENCES = {
  firstYear: 'First Year',
  international: 'International Student',
  graduate: 'Graduate Student'
};

export const CAMPUS_CODES = {
  bend: 'B',
  corvallis: 'C',
  ecampus: 'DSC'
};

export const AFFILIATIONS = {
  employee: 'employee',
  student: 'student'
};

export const GROUPS = {
  admin: 'admin',
  masquerade: 'masquerade'
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
  isAdmin: boolean;
  groups: string[];
  classification: IUserClassification;
  audienceOverride: IUserAudienceOverride;
  theme: string;
  primaryAffiliation: string;
  primaryAffiliationOverride?: string;
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
  primaryAffiliationOverride?: string;
  theme?: string;
}

export const initialUser: IUser = {
  classification: {},
  audienceOverride: {},
  isAdmin: false,
  groups: [],
  theme: defaultTheme,
  primaryAffiliation: AFFILIATIONS.employee
};

const getUser = (): Promise<IUser> =>
  axios
    .get('/api/user')
    .then(res => res.data)
    .catch(e => {
      window.location.href = '/login';
      return e;
    });

export const getClassification = (): Promise<IUserClassification> =>
  axios.get('/api/user/classification').then(res => res.data);

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isFirstYear = (user: IUser): boolean => {
  if (user?.audienceOverride?.firstYear !== undefined) {
    return user.audienceOverride.firstYear;
  }
  return (
    user.classification.attributes !== undefined &&
    user.classification.attributes.classification !== null &&
    CLASSIFICATIONS.firstYear.includes(
      user!.classification!.attributes!.classification.toLowerCase()
    )
  );
};

/**
 * Returns the audience override value or users classification in that order
 * of precedence.
 * @param user the user to inspect
 * @returns whether or not the override or user classification is true
 */
const isInternational = (user: IUser): boolean => {
  if (user.audienceOverride?.international !== undefined) {
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
  if (user.audienceOverride?.graduate !== undefined) {
    return user.audienceOverride.graduate;
  }
  return (
    user.classification.attributes?.level !== undefined &&
    CLASSIFICATIONS.graduate.includes(user.classification.attributes!.level?.toLowerCase())
  );
};

/**
 * Returns whether or not the users current primaryAffiliation is one of the supplied affiliations.
 * This intends to check if the user is a student or an employee while giving the application the ability
 * to specify scenarios where the user is in a number of affiliations.
 * @param user the user to inspect
 * @param affiliations the affiliations to check if the user is associated with
 */
export const hasPrimaryAffiliation = (user: IUser, affiliations: string[]): boolean => {
  if (user.primaryAffiliationOverride) {
    return affiliations.includes(user.primaryAffiliationOverride);
  }
  return affiliations.includes(user.primaryAffiliation);
};

/**
 * Returns your primary affiliation or the affiliationOverride if one is present
 * @param user the user to inspect
 */
export const getAffiliation = (user: IUser): string => {
  return user.primaryAffiliationOverride ?? user.primaryAffiliation;
};

/**
 * This method returns a fully populated user settings theme and overrides taking into consideration
 * thier student classification as well as any potentially persisted overrides
 * @param user the user to inspect
 */
export const usersSettings = (user: IUser): IUserSettings => ({
  theme: user.theme,
  audienceOverride: {
    campusCode: usersCampus(user).campusCode,
    firstYear: isFirstYear(user),
    international: isInternational(user),
    graduate: isGraduate(user)
  },
  primaryAffiliationOverride: user.primaryAffiliationOverride
});

/**
 * Detect if the user setting matches the default, taking into consideration the student classification if it exists.
 * @param user the user to inspect
 * @param propertyName check the student classification property value
 * @param currentValue the value to consider when the student classification doesn't exist
 * @param defaultValue the default value for comparison
 */
export const settingIsDefault = (
  user: IUser,
  propertyName: string,
  currentValue: string,
  defaultValue: string
): boolean => {
  const {
    classification: { attributes }
  } = user;
  if (attributes) {
    return attributes[propertyName] === currentValue;
  } else {
    return currentValue === defaultValue;
  }
};

/**
 * Detect if the user setting is an override of the default, taking into consideration the student classification if it exists.
 * @param user the user to inspect
 * @param propertyName check the student classification property value
 * @param currentValue the value to consider when the student classification doesn't exist
 * @param defaultValue the default value for comparison
 */
export const settingIsOverridden = (
  user: IUser,
  propertyName: string,
  currentValue: boolean,
  defaultValue: boolean
): boolean => {
  const {
    classification: { attributes }
  } = user;
  if (attributes) {
    const { isInternational, classification, level } = attributes;
    switch (propertyName) {
      case 'international':
        if (isInternational && currentValue !== undefined) {
          return !currentValue;
        } else {
          return false;
        }
      case 'firstYear':
        if (
          CLASSIFICATIONS.firstYear.includes(classification?.toLowerCase()) &&
          currentValue !== undefined
        ) {
          return !currentValue;
        } else {
          return false;
        }
      case 'graduate':
        if (CLASSIFICATIONS.graduate.includes(level?.toLowerCase()) && currentValue !== undefined) {
          return !currentValue;
        } else {
          return false;
        }
      default:
        return false;
    }
  } else {
    return currentValue !== defaultValue;
  }
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
  const { campusCode } = user.classification?.attributes ?? {
    campusCode: defaultCampus
  };
  const campusCodeOverride = user.audienceOverride?.campusCode ?? defaultCampus;
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
    audiences?.length === 0 ||
    (user.classification?.attributes === undefined && user.audienceOverride === undefined)
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

  if (isGraduate(user)) foundAudiences.push(CLASSIFICATION_AUDIENCES.graduate);
  if (isFirstYear(user)) foundAudiences.push(CLASSIFICATION_AUDIENCES.firstYear);
  if (isInternational(user)) foundAudiences.push(CLASSIFICATION_AUDIENCES.international);

  // The user has a classification and the item has audiences specified, return if
  // this users campusCode exists in the audience list.
  return item.audiences.some(a =>
    foundAudiences.map(fa => fa.toLowerCase()).includes(a.toLowerCase())
  );
};

/**
 * Detect if the users classification indicates that they are part of the campus provided
 * @param user the user to inspect
 * @param code the campus code for comparison
 */
export const atCampus = (user: IUser, code: string): boolean => {
  const { campusCode } = usersCampus(user);
  return campusCode.toLowerCase() === code.toLowerCase();
};

/**
 * The primary hook to fetch the user session and set the user for access throughout the application, this
 * is intended to be set near the root level of the application and exposed by way of the UserContext.
 */
export const useUser = () => {
  const [user, setUser] = useState<IUserState>({
    data: initialUser,
    error: false,
    loading: true,
    isCanvasOptIn: false
  });
  const u = useAPICall<IUser>(getUser, undefined, data => data, initialUser, false);
  const classification = useAPICall<IUserClassification>(
    getClassification,
    undefined,
    data => data,
    {},
    true
  );

  useEffect(() => {
    setUser({
      data: { ...u.data, classification: { ...classification.data } },
      error: u.error,
      loading: u.loading,
      isCanvasOptIn: u.data.isCanvasOptIn
    });
  }, [u.data, u.error, u.loading, classification.data, classification.loading]);

  return {
    error: user!.error,
    data: user!.data,
    loading: user!.loading,
    isCanvasOptIn: user!.data!.isCanvasOptIn,
    setUser
  };
};

/**
 * Send the settings to the backend to be saved.
 * @param settings the settings to persist to the backend
 */
export const postSettings = (settings: IUserSettings): Promise<IUserSettings> =>
  axios
    .post('/api/user/settings', settings)
    .then(res => res.data)
    .catch(e => {
      console.error(e);
      throw e;
    });
