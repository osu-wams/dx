/* eslint-disable no-unused-vars */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockUser } from '../../util/test-utils';
import { settingIsDefault, postSettings, settingIsOverridden, IUser } from '../user';
import { settingsData, audienceOverride } from '../__mocks__/user.data';

const mock = new MockAdapter(axios);
const mockedUser = jest.fn();

describe('User model', () => {
  describe('settingIsDefault', () => {
    beforeEach(() => mockedUser.mockReturnValue(mockUser));

    it('has matching attribute', async () => {
      const isDefault = settingIsDefault(mockedUser(), 'classification', 'Freshman', 'Freshman');
      expect(isDefault).toBeTruthy();
    });
    it('has mismatched attribute', async () => {
      const notDefault = settingIsDefault(
        mockedUser(),
        'classification',
        'notFreshman',
        'Freshman'
      );
      expect(notDefault).toBeFalsy();
    });
    it('has matching default value with missing attributes', async () => {
      mockedUser.mockReturnValue({ ...mockUser, classification: {} });
      const invalidAttributeIsDefault = settingIsDefault(
        mockedUser(),
        'classification',
        'Freshman',
        'Freshman'
      );
      expect(invalidAttributeIsDefault).toBeTruthy();
    });
    it('has mismatching default value with missing attributes', async () => {
      mockedUser.mockReturnValue({ ...mockUser, classification: {} });
      const invalidAttributeNotDefault = settingIsDefault(
        mockedUser(),
        'classification',
        'notFreshman',
        'Freshman'
      );
      expect(invalidAttributeNotDefault).toBeFalsy();
    });
  });

  describe('settingIsOverridden', () => {
    beforeEach(() => mockedUser.mockReturnValue(mockUser));

    it('defaults to comparing current value and default', async () => {
      mockedUser.mockReturnValue({ ...mockUser, classification: {} });
      expect(settingIsOverridden(mockedUser(), 'blah', true, false)).toBeTruthy();
      expect(settingIsOverridden(mockedUser(), 'blah', true, true)).toBeFalsy();
    });
    it('has default international setting', async () => {
      expect(settingIsOverridden(mockedUser(), 'international', true, false)).toBeFalsy();
    });
    it('has overridden international setting', async () => {
      mockedUser.mockReturnValue({
        ...mockUser,
        classification: { attributes: { isInternational: true } }
      });
      expect(settingIsOverridden(mockedUser(), 'international', false, false)).toBeTruthy();
    });
    it('has default firstYear setting', async () => {
      expect(settingIsOverridden(mockedUser(), 'firstYear', true, false)).toBeFalsy();
    });
    it('has overridden firstYear setting', async () => {
      mockedUser.mockReturnValue({
        ...mockUser,
        classification: { attributes: { classification: 'freshman' } }
      });
      expect(settingIsOverridden(mockedUser(), 'firstYear', false, false)).toBeTruthy();
    });
    it('has default graduate setting', async () => {
      expect(settingIsOverridden(mockedUser(), 'graduate', true, false)).toBeFalsy();
    });
    it('has overridden graduate setting', async () => {
      mockedUser.mockReturnValue({
        ...mockUser,
        classification: { attributes: { level: 'graduate' } }
      });
      expect(settingIsOverridden(mockedUser(), 'graduate', false, false)).toBeTruthy();
    });
  });
});

describe('postSettings', () => {
  it('returns an updated settings', async () => {
    mock.onPost('/api/user/settings').reply(200, settingsData.data);
    const result = await postSettings({ audienceOverride });
    expect(result).toStrictEqual({ audienceOverride });
  });
  it('returns an error', async () => {
    mock.onPost('/api/user/settings').reply(500);
    await expect(postSettings({ audienceOverride })).rejects.toThrow();
  });
});
