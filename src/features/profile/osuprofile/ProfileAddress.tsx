import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { useAddresses } from '@osu-wams/hooks';
import Icon from 'src/ui/Icon';
import { Types } from '@osu-wams/lib';

const ProfileAddress = () => {
  const { isSuccess, data } = useAddresses();
  const themeContext = useContext(ThemeContext);
  return <>{isSuccess && data && renderAddress(data, themeContext.features.profile.icon.color)}</>;
};

const renderAddress = (
  { attributes: { addressType, addressLine1, city, stateCode, postalCode } }: Types.Address,
  color
) => (
  <div>
    <dt>
      <Icon icon={faMapMarkerAlt} color={color} />{' '}
      <VisuallyHidden>{addressType.description ?? 'No address description'}</VisuallyHidden>
    </dt>
    <dd>
      {addressLine1 && addressLine1}
      <br />
      {city ?? 'No city name'}, {stateCode ?? 'No state title'} {postalCode ?? 'No postal code'}
    </dd>
  </div>
);

export { ProfileAddress };
