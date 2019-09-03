import React from 'react';
import { waitForElement } from '@testing-library/react';
import { render } from '../../util/test-utils';
import { raveAlerts, dxAlerts } from '../../api/__mocks__/alerts.data';
import Alerts from '../Alerts';

const mockGetDxAlerts = jest.fn();
const mockGetRaveAlerts = jest.fn();

jest.mock('../../api/alerts', () => ({
  getDxAlerts: () => mockGetDxAlerts(),
  getRaveAlerts: () => mockGetRaveAlerts()
}));

describe('<Alerts />', () => {
  describe('with a Rave alert and no DX Alert', () => {
    beforeAll(() => {
      mockGetRaveAlerts.mockResolvedValue(Promise.resolve(raveAlerts));
      mockGetDxAlerts.mockResolvedValue(Promise.resolve([]));
    });
    it('should not find the DX alert', async () => {
      const { getByText, queryByText } = render(<Alerts />);
      const raveTitle = await waitForElement(() => getByText('First Rave'));
      const dxTitle = queryByText('BobRoss');
      expect(raveTitle).toBeInTheDocument();
      expect(dxTitle).not.toBeInTheDocument();
    });
  });
  describe('with an info DX alert and no Rave Alert', () => {
    beforeAll(() => {
      mockGetRaveAlerts.mockResolvedValue(Promise.resolve([]));
      mockGetDxAlerts.mockResolvedValue(Promise.resolve(dxAlerts));
    });
    it('should not find the Rave alert', async () => {
      const { getByText, queryByText } = render(<Alerts />);
      const dxTitle = await waitForElement(() => getByText('BobRoss'));
      const raveTitle = queryByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).not.toBeInTheDocument();
    });
  });
  describe('with a warn DX alert and no Rave Alert', () => {
    beforeAll(() => {
      mockGetRaveAlerts.mockResolvedValue(Promise.resolve([]));
      mockGetDxAlerts.mockResolvedValue(Promise.resolve([dxAlerts[1]]));
    });
    it('should not find the Rave alert', async () => {
      const { getByText, queryByText } = render(<Alerts />);
      const dxTitle = await waitForElement(() => getByText('Old Dx Alert'));
      const raveTitle = queryByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).not.toBeInTheDocument();
    });
  });
  describe('with a DX alert and a Rave Alert', () => {
    beforeAll(() => {
      mockGetRaveAlerts.mockResolvedValue(Promise.resolve(raveAlerts));
      mockGetDxAlerts.mockResolvedValue(Promise.resolve(dxAlerts));
    });
    it('should not find the Rave alert', async () => {
      const { getByText, queryByText } = render(<Alerts />);
      const dxTitle = await waitForElement(() => getByText('BobRoss'));
      const raveTitle = getByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).toBeInTheDocument();
    });
  });
  describe('with no alerts', () => {
    beforeAll(() => {
      mockGetRaveAlerts.mockResolvedValue(Promise.resolve([]));
      mockGetDxAlerts.mockResolvedValue(Promise.resolve([]));
    });
    it('should not find any alerts', async () => {
      const { getByText, queryByText, debug } = render(<Alerts />);
      debug();
      const dxTitle = queryByText('BobRoss');
      const raveTitle = queryByText('First Rave');
      expect(dxTitle).not.toBeInTheDocument();
      expect(raveTitle).not.toBeInTheDocument();
    });
  });
});
