import React, { useContext } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { useMailingAddress, IMailingAddress } from '../../../api/persons/addresses';
import Icon from '../../../ui/Icon';
import { ThemeContext } from '../../../theme';

const ProfileAddress = () => {
  const address = useMailingAddress();
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
    attributes: { addressTypeDescription, addressLine1, city, stateCode, postalCode }
  }: IMailingAddress,
  color
) => (
  <div>
    <dt>
      <Icon icon={faMapMarkerAlt} color={color} />{' '}
      <VisuallyHidden>{addressTypeDescription ?? 'No address description'}</VisuallyHidden>
    </dt>
    <dd>
      {addressLine1 && addressLine1}
      <br />
      {city ?? 'No city name'}, {stateCode ?? 'No state title'} {postalCode ?? 'No postal code'}
    </dd>
  </div>
);

export { ProfileAddress };
