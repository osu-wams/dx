import axios from 'axios';
import useAPICall from './useAPICall';

export interface IUserClassificationAttributes {
  level: string;
  campus: string;
  classification: string;
  isInternational: boolean;
}

export interface IUserClassification {
  attributes?: IUserClassificationAttributes;
  id: string;
}

export interface IResourceResult {
  id: string;
  title: string;
  icon?: string;
  uri: string;
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}

/**
 *  Translate the various student classifications to what the matching "Resource Audience"
 *  might be set to from the backend API.
 * @param user the user to inspect for classifications
 */
const userClassifications = (user: any): string[] => {
  const results: string[] = [];
  const userClassification: IUserClassification = user.classification || {};
  if (!('attributes' in userClassification)) return results;

  const {
    level,
    campus,
    classification,
    isInternational
  } = userClassification.attributes as IUserClassificationAttributes;
  if (level === 'Graduate') results.push('Graduate Student');
  if (classification === 'Freshman') results.push('First Year');
  if (isInternational) results.push('International Student');
  switch (campus) {
    case 'Dist. Degree Corvallis Student':
      results.push('Ecampus');
      break;
    case 'Oregon State - Cascades':
      results.push('Bend');
      break;
    default:
      results.push('Corvallis');
      break;
  }
  return results;
};

/**
 *  If a user doesn't have a student classification, or if the resource doesn't
 *  have audiences specified then return the resource.. otherwise, filter the resources.
 * @param resources the list of resources to be optionally filtered
 * @param user the user to consider of filtering resources
 */
const filterResourcesForUser = (
  resources: (IResourceResult & { audiences: string[] })[],
  user: any
): IResourceResult[] => {
  const classifications = userClassifications(user);
  return resources
    .filter(e => {
      if (classifications.length === 0 || e.audiences.length === 0) return true;
      return e.audiences.some(audience => classifications.includes(audience));
    })
    .map(({ audiences, ...resourceAttribs }) => {
      return { ...resourceAttribs };
    });
};

/**
 * Resources
 */
const getResources = (query: string): Promise<IResourceResult[]> =>
  axios.get(`/api/resources${query ? `${query}` : ''}`).then(res => res.data);
const useResources = (query: string, user) => {
  return useAPICall<IResourceResult[]>(
    getResources,
    query,
    d => {
      const transformed = filterResourcesForUser(d, user);
      return transformed;
    },
    []
  );
};

/**
 * Resources by Query
 */
const getResourcesByQuery = (query: string): Promise<IResourceResult[]> =>
  axios.get(`/api/resources${query ? `?query=${query}` : ''}`).then(res => res.data);
const useResourcesByQuery = (query: string, user) => {
  return useAPICall<IResourceResult[]>(
    getResourcesByQuery,
    query,
    d => {
      const transformed = filterResourcesForUser(d, user);
      return transformed;
    },
    []
  );
};

/**
 * ResourcesByCategory
 */
const getResourcesByCategory = (categoryId: string): Promise<IResourceResult[]> =>
  axios
    .get(`/api/resources${categoryId !== 'all' ? `?category=${categoryId}` : ''}`)
    .then(res => res.data);
const useResourcesByCategory = (categoryId: string, user) => {
  return useAPICall<IResourceResult[]>(
    getResourcesByCategory,
    categoryId,
    d => {
      const transformed = filterResourcesForUser(d, user);
      return transformed;
    },
    []
  );
};

/**
 * ResourcesByQueue
 */
const getResourcesByQueue = (category: string): Promise<IResourceResult[]> =>
  axios.get(`/api/resources/category/${category}`).then(res => res.data);
const useResourcesByQueue = (category: string, user) =>
  useAPICall<IResourceResult[]>(
    getResourcesByQueue,
    category,
    d => {
      const transformed = filterResourcesForUser(d, user);
      return transformed;
    },
    []
  );

/**
 * Categories
 */
const getCategories = (): Promise<ICategory[]> =>
  axios.get('/api/resources/categories').then(res => res.data);

/**
 * Gets data from the Categories API
 * @param callback (optional) data transformation function
 */
const useCategories = (callback: Function = data => data) => {
  return useAPICall<ICategory[]>(getCategories, undefined, callback, []);
};

// Category selected by default. Currently the 'featured' category id
const defaultCategoryId = '6b7cd598-d71e-45f7-911c-d71551ec0a7c';

export {
  useResources,
  useResourcesByQuery,
  useResourcesByCategory,
  defaultCategoryId,
  useCategories,
  useResourcesByQueue
};
