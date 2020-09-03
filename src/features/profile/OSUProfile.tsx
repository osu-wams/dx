import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import { faEnvelope, faPhone, faMobileAlt, faUserCircle } from '@fortawesome/pro-light-svg-icons';
import { Loading } from 'src/ui/Loading';
import { usePerson } from '@osu-wams/hooks';
import { Card, CardHeader, CardIcon, CardContent, CardFooter } from 'src/ui/Card';

import { ContactInfo, PairData, renderPhone } from './osuprofile/osuprofile-utils';
import { ProfileAddress } from './osuprofile/ProfileAddress';
import { PersonsAttributes } from '@osu-wams/hooks/dist/api/person/persons';
import { ExternalLink } from 'src/ui/Link';
import Url from 'src/util/externalUrls.data';
import { Event } from 'src/util/gaTracking';

const OSUProfile = () => {
  const themeContext = useContext(ThemeContext);
  const person = usePerson();

  return (
    <Card collapsing={false}>
      {person.loading && <Loading lines={6} />}
      {!person.loading && !person.data && <p>Cannot find your information</p>}
      {!person.loading &&
        person.data &&
        Object.keys(person).length &&
        renderProfile(person.data, themeContext.features.profile.icon.color)}
      <CardFooter>
        <ExternalLink
          href={Url.banner.editProfile}
          onClick={() => Event('profile', 'Update Personal Information', Url.banner.editProfile)}
        >
          Update Personal Information
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

const renderProfile = (
  {
    id,
    firstName,
    middleName,
    lastName,
    displayFirstName,
    displayMiddleName,
    displayLastName,
    username,
    primaryPhone,
    homePhone,
    mobilePhone,
    email,
  }: PersonsAttributes,
  iconColor: string
) => {
  /**
   * Build a single string to display
   */
  const nameToDisplay = () => {
    let fn, mn;
    if (firstName || displayFirstName) {
      fn = displayFirstName ?? firstName;
    }

    const ln = displayLastName ?? lastName;

    if (middleName || displayMiddleName) {
      mn = middleName ?? displayMiddleName;
      return `${fn} ${mn} ${ln}`;
    }

    return `${fn} ${ln}`;
  };
  return (
    <>
      <CardHeader title={nameToDisplay()} badge={<CardIcon icon={faUserCircle} />} />
      <CardContent>
        <PairData>
          <div>
            <dt>ONID</dt>
            <dd>{username ?? 'No username'}</dd>
          </div>
          <div>
            <dt>OSU ID</dt>
            <dd>{id ?? 'No ID'}</dd>
          </div>
        </PairData>
        <ContactInfo>
          {primaryPhone !== mobilePhone &&
            renderPhone('Primary phone', primaryPhone, faPhone, iconColor)}
          {homePhone !== primaryPhone &&
            homePhone !== mobilePhone &&
            renderPhone('Home phone', homePhone, faPhone, iconColor)}
          {renderPhone('Mobile phone', mobilePhone, faMobileAlt, iconColor)}
          {renderPhone('Email', email, faEnvelope, iconColor)}
          <ProfileAddress />
        </ContactInfo>
      </CardContent>
    </>
  );
};

export default OSUProfile;
