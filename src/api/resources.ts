import axios from 'axios';
import useAPICall from './useAPICall';

export interface IResourceResult {
  id: string;
  title: string;
  iconName?: string;
  link: string;
  synonyms: string[];
  categories: string[];
  audiences: string[];
  affiliation: string[];
}

export interface IEntityQueueResourceResult {
  entityQueueTitle: string;
  items: IResourceResult[];
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
}

/**
 * Resources
 */
const getResources = (): Promise<IResourceResult[]> =>
  axios.get(`/api/resources`).then(res => {
    return res.data;
  });

const useResources = () => {
  return useAPICall<IResourceResult[]>(getResources, undefined, d => d, []);
};

/**
 * ResourcesByQueue
 */
const getResourcesByQueue = (category: string): Promise<IResourceResult[]> =>
  axios.get(`/api/resources/category/${category}`).then(res => res.data);

const useResourcesByQueue = (category: string) =>
  useAPICall<IEntityQueueResourceResult>(getResourcesByQueue, category, d => d, {
    entityQueueTitle: '',
    items: []
  });

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
const defaultCategoryName = () => 'featured';

export {
  useResources,
  defaultCategoryName,
  useCategories,
  useResourcesByQueue,
  getCategories,
  getResources,
  getResourcesByQueue
};
