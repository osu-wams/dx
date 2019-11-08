import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';
import { faEnvelope, faMapMarkerAlt, faPhone, faMobileAlt } from '@fortawesome/pro-light-svg-icons';
import Skeleton from 'react-loading-skeleton';
import { theme } from '../../theme';
import { formatPhone } from '../../util/helpers';
import Icon from '../../ui/Icon';
import { usePerson } from '../../api/persons/persons';
import { useMailingAddress } from '../../api/persons/addresses';
import PlainCard from '../../ui/PlainCard';

const OSUProfile = () => {
  const themeContext = useContext(ThemeContext);
  const person = usePerson();
  const address = useMailingAddress();

  return (
    <PlainCard>
      {person.loading && <Skeleton count={6} />}
      {!person.loading && !person.data && <p>Cannot find your information</p>}
      {!person.loading && person && Object.keys(person).length && (
        <>
          <PersonName>
            {person.data && !person.loading ? person.data.attributes.firstName : ''}{' '}
            {person.data && !person.loading ? person.data.attributes.lastName : ''}
          </PersonName>
          <PairData>
            <div>
              <dt>ONID</dt>
              <dd>{person.data ? person.data.attributes.username : 'No username'}</dd>
            </div>
            <div>
              <dt>OSU ID</dt>
              <dd>{person.data ? person.data.id : 'No ID'}</dd>
            </div>
          </PairData>
          <ContactInfo>
            {person.data &&
              person.data.attributes.primaryPhone !== person.data.attributes.mobilePhone &&
              renderInfoIcons(
                'Primary phone',
                formatPhone(person.data.attributes.primaryPhone),
                faPhone,
                themeContext.features.profile.icon.color
              )}
            {person.data &&
              person.data.attributes.homePhone !== person.data.attributes.mobilePhone &&
              person.data.attributes.homePhone !== person.data.attributes.mobilePhone &&
              renderInfoIcons(
                'Home phone',
                formatPhone(person.data.attributes.homePhone),
                faPhone,
                themeContext.features.profile.icon.color
              )}
            {renderInfoIcons(
              'Mobile phone',
              formatPhone(person.data ? person.data.attributes.mobilePhone : null),
              faMobileAlt,
              themeContext.features.profile.icon.color
            )}
            {renderInfoIcons(
              'Email',
              person.data && !person.loading ? person.data.attributes.email : '',
              faEnvelope,
              themeContext.features.profile.icon.color
            )}
            {!address.loading && address && (
              <div>
                <dt>
                  <Icon icon={faMapMarkerAlt} color={themeContext.features.profile.icon.color} />{' '}
                  <VisuallyHidden>
                    {address.data ? address.data.attributes.addressTypeDescription : 'No data'}
                  </VisuallyHidden>
                </dt>
                <dd>
                  {address.data ? address.data.attributes.addressLine1 : ''}
                  <br />
                  {address.data ? address.data.attributes.city : 'No city name'},{' '}
                  {address.data ? address.data.attributes.stateCode : 'No state title'}{' '}
                  {address.data ? address.data.attributes.postalCode : 'No postal Code'}
                </dd>
              </div>
            )}
          </ContactInfo>
        </>
      )}
    </PlainCard>
  );
};

const renderInfoIcons = (title: string, field: any | null, icon: any, color: string) => {
  if (field) {
    return (
      <div>
        <dt>
          <Icon icon={icon} color={color} /> <VisuallyHidden>{title}</VisuallyHidden>
        </dt>
        <dd>{field}</dd>
      </div>
    );
  }
};

const PersonName = styled.h3`
  color: ${({ theme }) => theme.features.profile.name.color};
  margin: 0;
  font-weight: 500;
  font-size: ${theme.fontSize[24]};
`;

const PairData = styled.dl`
  margin: 0.5rem 0;
  display: flex;
  & > div {
    margin-right: 4rem;
  }
  dt {
    font-size: ${theme.fontSize[12]};
    font-weight: 600;
    color: ${({ theme }) => theme.features.profile.detail.color};
  }
  dd {
    margin-left: 0;
  }
`;

const ContactInfo = styled.dl`
  dt,
  dd {
    display: inline-block;
    vertical-align: top;
    padding-bottom: 1.8rem;
    svg {
      font-size: ${theme.fontSize[24]};
    }
  }
`;

export default OSUProfile;
