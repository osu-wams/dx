/* eslint-disable no-unused-vars */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getStatus, allOperational, sortedByStatus, withStickyIncidents } from '../status';
import statusData from '../__mocks__/status.data';

const mock = new MockAdapter(axios);

describe('getStatus', () => {
  it('gets all statuses', async () => {
    mock.onGet('/api/status').reply(200, statusData.data);
    const result = await getStatus();
    expect(result.map(c => c.id)).toStrictEqual(statusData.data.map(c => c.id));
  });

  it('sorts the components based on the status', async () => {
    mock.onGet('/api/status').reply(200, statusData.data);
    const result = await getStatus();
    expect(sortedByStatus(result).map(c => c.statusText)).toStrictEqual([
      'Major Outage',
      'Performance Issues',
      'Operational',
      'Operational'
    ]);
  });
  it('returns that some components have non operational status', async () => {
    mock.onGet('/api/status').reply(200, statusData.data);
    const result = await getStatus();
    expect(allOperational(result)).toBeFalsy();
  });
  it('returns that all components are operational', async () => {
    mock.onGet('/api/status').reply(
      200,
      statusData.data.map(c => ({ ...c, status: 1 }))
    );
    const result = await getStatus();
    expect(allOperational(result)).toBeTruthy();
  });
  it('returns components with sticky incidents', async () => {
    mock.onGet('/api/status').reply(200, statusData.data);
    const result = await getStatus();
    expect(withStickyIncidents(result)).toHaveLength(1);
  });
  it('returns no components with sticky incidents', async () => {
    mock.onGet('/api/status').reply(
      200,
      statusData.data.map(c => ({ ...c, incidents: [] }))
    );
    const result = await getStatus();
    expect(withStickyIncidents(result)).toHaveLength(0);
  });
});
