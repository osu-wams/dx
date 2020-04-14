import React from 'react';
import { render } from 'src/util/test-utils';
import Alerts from '../Alerts';
import { Alerts as alertsHooks } from '@osu-wams/hooks';

const { raveAlerts, dxAlerts } = alertsHooks.mockAlerts;
const mockUseDxAlerts = jest.fn();
const mockUseRaveAlerts = jest.fn();
const mockNoData = { data: [], loading: false, error: false };

jest.mock('@osu-wams/hooks', () => {
  return {
    ...jest.requireActual('@osu-wams/hooks'),
    useDxAlerts: () => mockUseDxAlerts(),
    useRaveAlerts: () => mockUseRaveAlerts(),
  };
});

describe('<Alerts />', () => {
  describe('with a Rave alert and no DX Alert', () => {
    beforeEach(() => {
      mockUseRaveAlerts.mockReturnValue(raveAlerts);
      mockUseDxAlerts.mockReturnValue(mockNoData);
    });
    it('should not find the DX alert', async () => {
      const { getByText, queryByText } = render(<Alerts />);
      const raveTitle = getByText('First Rave');
      const dxTitle = queryByText('BobRoss');
      expect(raveTitle).toBeInTheDocument();
      expect(dxTitle).not.toBeInTheDocument();
    });
  });
  describe('with an info DX alert and no Rave Alert', () => {
    beforeEach(() => {
      mockUseRaveAlerts.mockReturnValue(mockNoData);
      mockUseDxAlerts.mockReturnValue(dxAlerts);
    });
    it('should not find the Rave alert', async () => {
      const { getByText, queryByText } = render(<Alerts />);
      const dxTitle = getByText('BobRoss');
      const raveTitle = queryByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).not.toBeInTheDocument();
    });
  });
  describe('with a warn DX alert and no Rave Alert', () => {
    beforeEach(() => {
      mockUseRaveAlerts.mockReturnValue(mockNoData);
      mockUseDxAlerts.mockReturnValue({ data: [dxAlerts.data[1]], loading: false, error: false });
    });
    it('should not find the Rave alert', async () => {
      const { getByText, queryByText } = render(<Alerts />);
      const dxTitle = getByText('Old Dx Alert');
      const raveTitle = queryByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).not.toBeInTheDocument();
    });
  });
  describe('with a DX alert and a Rave Alert', () => {
    beforeEach(() => {
      mockUseRaveAlerts.mockReturnValue(raveAlerts);
      mockUseDxAlerts.mockReturnValue(dxAlerts);
    });
    it('should not find the Rave alert', async () => {
      const { getByText } = render(<Alerts />);
      const dxTitle = getByText('BobRoss');
      const raveTitle = getByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).toBeInTheDocument();
    });
  });
  describe('with no alerts', () => {
    beforeEach(() => {
      mockUseRaveAlerts.mockReturnValue(mockNoData);
      mockUseDxAlerts.mockReturnValue(mockNoData);
    });
    it('should not find any alerts', async () => {
      const { queryByText } = render(<Alerts />);
      const dxTitle = queryByText('BobRoss');
      const raveTitle = queryByText('First Rave');
      expect(dxTitle).not.toBeInTheDocument();
      expect(raveTitle).not.toBeInTheDocument();
    });
  });
});
