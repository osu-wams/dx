import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { useAddresses } from '@osu-wams/hooks';
import Icon from 'src/ui/Icon';
import { MailingAddress } from '@osu-wams/hooks/dist/api/person/addresses';

const ProfileAddress = () => {
  const address = useAddresses();
  const themeContext = useContext(ThemeContext);
  return (
    <>
      {!address.loading &&
        address.data &&
        renderAddress(address.data, themeContext.features.profile.icon.color)}
    </>
  );
};

const renderAddress = (
  {
    attributes: { addressType, addressLine1, city, stateCode, postalCode },
  }: MailingAddress,
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
