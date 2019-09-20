import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';
import { faEnvelope, faMapMarkerAlt, faPhone, faMobileAlt } from '@fortawesome/pro-light-svg-icons';
import Skeleton from 'react-loading-skeleton';
import { theme, Color } from '../../theme';
import { formatPhone } from '../../util/helpers';
import Icon from '../../ui/Icon';
import { getPerson, IPersons } from '../../api/persons/persons';
import { useMailingAddress } from '../../api/persons/addresses';
import PlainCard from '../../ui/PlainCard';

const OSUProfile = () => {
  const [person, setPerson] = useState<IPersons | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const address = useMailingAddress();
  // const [address, setAddress] = useState<IMailingAddress | null>(null);

  useEffect(() => {
    let isMounted = true;
    getPerson()
      .then(data => {
        if (isMounted) {
          setPerson(data);
          setLoading(false);
        }
      })
      .catch(console.log);
    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted = false;
    };
  }, []);

  return (
    <PlainCard title="OSU Profile">
      {loading && <Skeleton count={6} />}
      {!loading && !person && <p>Cannot find your information</p>}
      {person && Object.keys(person).length && (
        <>
          <PersonName>
            {person.attributes.firstName} {person.attributes.lastName}
          </PersonName>
          <PairData>
            <div>
              <dt>ONID</dt>
              <dd>{person.attributes.username}</dd>
            </div>
            <div>
              <dt>OSU ID</dt>
              <dd>{person.id}</dd>
            </div>
          </PairData>
          <ContactInfo>
            {person.attributes.primaryPhone !== person.attributes.mobilePhone &&
              renderInfoIcons(
                'Primary phone',
                formatPhone(person.attributes.primaryPhone),
                faPhone
              )}
            {person.attributes.homePhone !== person.attributes.mobilePhone &&
              person.attributes.homePhone !== person.attributes.mobilePhone &&
              renderInfoIcons('Home phone', formatPhone(person.attributes.homePhone), faPhone)}
            {renderInfoIcons(
              'Mobile phone',
              formatPhone(person.attributes.mobilePhone),
              faMobileAlt
            )}
            {renderInfoIcons('Email', person.attributes.email, faEnvelope)}
            {address && (
              <div>
                <dt>
                  <Icon icon={faMapMarkerAlt} color={Color['orange-400']} />{' '}
                  <VisuallyHidden>{address.data ? address.data.attributes.addressTypeDescription : 'No data'}</VisuallyHidden>
                </dt>
                <dd>
                  {address.data ? address.data.attributes.addressLine1 : ''}
                  <br />
                  {address.data ? address.data.attributes.city:'No city name'}, {address.data ? address.data.attributes.stateCode : 'No state title'}{' '}
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

const renderInfoIcons = (title: string, field: any | null, icon: any) => {
  if (field) {
    return (
      <div>
        <dt>
          <Icon icon={icon} color={Color['orange-400']} /> <VisuallyHidden>{title}</VisuallyHidden>
        </dt>
        <dd>{field}</dd>
      </div>
    );
  }
};

const PersonName = styled.h3`
  color: ${Color['orange-400']};
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
    color: ${Color['neutral-550']};
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
