import axios from 'axios';
import useAPICall from './useAPICall';

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
 * Resources
 */
const getResources = (query: string): Promise<IResourceResult[]> =>
  axios.get(`/api/resources${query ? `?query=${query}` : ''}`).then(res => res.data);

/**
 * ResourcesByCategory
 */
const getResourcesByCategory = (categoryId: string): Promise<IResourceResult[]> =>
  axios
    .get(`/api/resources${categoryId !== 'all' ? `?category=${categoryId}` : ''}`)
    .then(res => res.data);

/**
 * ResourcesByQueue
 */
const getResourcesByQueue = (category: string): Promise<IResourceResult[]> =>
  axios.get(`/api/resources/category/${category}`).then(res => res.data);
const useResourcesByQueue = (category: string) =>
  useAPICall<IResourceResult[]>(getResourcesByQueue, category, d => d, []);

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

// Category selected by default. Currently the 'popular' category id
const defaultCategoryId = '1b9b7a4b-5a64-41af-a40a-8bb01abedd19';

export {
  getResources,
  getResourcesByCategory,
  getCategories,
  defaultCategoryId,
  useCategories,
  useResourcesByQueue
};
