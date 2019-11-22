/* eslint-disable no-unused-vars */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getResources, getResourcesByQueue, getCategories } from '../resources';
import { resourcesData, categoriesData } from '../__mocks__/resources.data';

const mock = new MockAdapter(axios);

describe('getResources', () => {
  it('gets all resources for a non-student', async () => {
    mock.onGet('/api/resources').reply(200, resourcesData.data);
    const result = await getResources();
    expect(result.map(r => r.title)).toStrictEqual(resourcesData.data.map(r => r.title));
  });
  it('gets all resources', async () => {
    mock.onGet('/api/resources').reply(200, resourcesData.data);
    const result = await getResources('');
    expect(result.map(r => r.title)).toStrictEqual(resourcesData.data.map(r => r.title));
  });
});

describe('getResourcesByQueue', () => {
  it('gets all resources for a non-student', async () => {
    mock.onGet(new RegExp('/api/resources/category/financial')).reply(200, resourcesData.data);
    const result = await getResourcesByQueue('financial');
    expect(result.map(r => r.title)).toStrictEqual(resourcesData.data.map(r => r.title));
  });
  it('gets all resources', async () => {
    mock.onGet(new RegExp('/api/resources/category/featured')).reply(200, resourcesData.data);
    const result = await getResourcesByQueue('featured');
    expect(result.map(r => r.title)).toStrictEqual(resourcesData.data.map(r => r.title));
  });
});

describe('getCategories', () => {
  it('gets all categories', async () => {
    mock.onGet('/api/resources/categories').reply(200, categoriesData.data);
    const result = await getCategories();
    expect(result.map(r => r.name)).toStrictEqual(categoriesData.data.map(r => r.name));
  });
});
