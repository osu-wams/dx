import axios from 'axios';
import useAPICall from './useAPICall';
import { getClassification } from '../api/student/classification';

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

const userClassifications = async () => {
  const classifications = await getClassification();
  const results: string[] = [];
  if (classifications.attributes.level === 'Graduate') {
    results.push('Graduate Student');
  }
  if (classifications.attributes.campus === 'Dist. Degree Corvallis Student') {
    results.push('Ecampus');
  } else if (classifications.attributes.campus === 'Oregon State - Cascades') {
    results.push('Bend');
  } else {
    results.push('Corvallis');
  }
  if (classifications.attributes.classification === 'Freshman') {
    results.push('First Year');
  }
  if (classifications.attributes.isInternational) {
    results.push('International Student');
  }
  return results;
};

const filterResourcesForUser = async (
  resources: (IResourceResult & { audiences: string[] })[]
): Promise<IResourceResult[]> => {
  const classifications = await userClassifications();
  return resources
    .filter(e => e.audiences.some(audience => classifications.includes(audience)))
    .map(({ audiences, ...resourceAttribs }) => {
      return { ...resourceAttribs };
    });
};

/**
 * Resources
 */
const getResources = (query: string): Promise<IResourceResult[]> =>
  axios.get(`/api/resources${query ? `${query}` : ''}`).then(res => res.data);
const useResources = (query: string) => {
  return useAPICall<IResourceResult[]>(
    getResources,
    query,
    async d => {
      const transformed = await filterResourcesForUser(d);
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
const useResourcesByQuery = (query: string) => {
  return useAPICall<IResourceResult[]>(
    getResourcesByQuery,
    query,
    async d => {
      const transformed = await filterResourcesForUser(d);
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
const useResourcesByCategory = (categoryId: string) => {
  return useAPICall<IResourceResult[]>(
    getResourcesByCategory,
    categoryId,
    async d => {
      const transformed = await filterResourcesForUser(d);
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
const useResourcesByQueue = (category: string) =>
  useAPICall<IResourceResult[]>(
    getResourcesByQueue,
    category,
    async d => {
      const transformed = await filterResourcesForUser(d);
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
