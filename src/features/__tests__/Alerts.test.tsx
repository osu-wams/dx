import React from 'react';
import { screen } from '@testing-library/react';
import { render, alterMock } from 'src/util/test-utils';
import Alerts from '../Alerts';
import { Alerts as alertsHooks } from '@osu-wams/hooks';
import { DX_ALERTS_API, RAVE_ALERTS_API } from 'src/mocks/apis';
const { dxAlerts } = alertsHooks.mockAlerts;

describe('<Alerts />', () => {
  describe('with a Rave alert and no DX Alert', () => {
    it('should not find the DX alert', async () => {
      alterMock(DX_ALERTS_API, []);
      render(<Alerts />);
      expect(await screen.findByText('First Rave')).toBeInTheDocument();
      expect(screen.queryByText('BobRoss')).toBeNull();
    });
  });

  describe('with an info DX alert and no Rave Alert', () => {
    it('should not find the Rave alert', async () => {
      alterMock(RAVE_ALERTS_API, []);
      render(<Alerts />);
      const dxTitle = await screen.findByText('BobRoss');
      const raveTitle = screen.queryByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).toBeNull();
    });
  });

  describe('with a warn DX alert and no Rave Alert', () => {
    it('should not find the Rave alert', async () => {
      alterMock(DX_ALERTS_API, [dxAlerts.data[1]]);
      alterMock(RAVE_ALERTS_API, []);
      render(<Alerts />);

      const dxTitle = await screen.findByText(/Old Dx Alert/i);
      const raveTitle = screen.queryByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).toBeNull();
    });
  });

  describe('with a DX alert and a Rave Alert', () => {
    it('should not find the Rave alert', async () => {
      render(<Alerts />);
      const dxTitle = await screen.findByText('BobRoss');
      const raveTitle = await screen.findByText('First Rave');
      expect(dxTitle).toBeInTheDocument();
      expect(raveTitle).toBeInTheDocument();
    });
  });

  /**
   * !TODO: improve test below
   * this test passes with our without the empty mocks, since the component
   * async data is not present immediately.
   *  */

  describe('with no alerts', () => {
    beforeEach(() => {
      alterMock(DX_ALERTS_API, []);
      alterMock(RAVE_ALERTS_API, []);
    });
    it('should not find any alerts', async () => {
      render(<Alerts />);
      const dxTitle = screen.queryByText('BobRoss');
      const raveTitle = screen.queryByText('First Rave');
      expect(dxTitle).toBeNull();
      expect(raveTitle).toBeNull();
    });
  });
});
