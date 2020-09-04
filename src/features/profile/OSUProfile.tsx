import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import { faEnvelope, faPhone, faMobileAlt, faUserCircle } from '@fortawesome/pro-light-svg-icons';
import { Loading } from 'src/ui/Loading';
import { usePerson } from '@osu-wams/hooks';
import { Card, CardHeader, CardIcon, CardContent, CardFooter } from 'src/ui/Card';
import { ContactInfo, PairData, renderPhone } from './osuprofile/osuprofile-utils';
import { ProfileAddress } from './osuprofile/ProfileAddress';
import { Types } from '@osu-wams/lib';
import { ExternalLink } from 'src/ui/Link';
import Url from 'src/util/externalUrls.data';
import { Event } from 'src/util/gaTracking';

const OSUProfile = () => {
  const themeContext = useContext(ThemeContext);
  const person = usePerson();

  return (
    <Card collapsing={false}>
      {person.isLoading && <Loading lines={6} />}
      {!person.isLoading && !person.data && <p>Cannot find your information</p>}
      {person.isSuccess &&
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

const renderProfile = (p: Types.PersonsAttributes, iconColor: string) => {
  /**
   * Build a single string to display
   */
  const nameToDisplay = () => {
    let fn, mn;
    if (p.firstName || p.displayFirstName) {
      fn = p.displayFirstName ?? p.firstName;
    }

    const ln = p.displayLastName ?? p.lastName;

    if (p.middleName || p.displayMiddleName) {
      mn = p.middleName ?? p.displayMiddleName;
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
            <dd>{p.username ?? 'No username'}</dd>
          </div>
          <div>
            <dt>OSU ID</dt>
            <dd>{p.id ?? 'No ID'}</dd>
          </div>
        </PairData>
        <ContactInfo>
          {p.primaryPhone !== p.mobilePhone &&
            renderPhone('Primary phone', p.primaryPhone, faPhone, iconColor)}
          {p.homePhone !== p.primaryPhone &&
            p.homePhone !== p.mobilePhone &&
            renderPhone('Home phone', p.homePhone, faPhone, iconColor)}
          {renderPhone('Mobile phone', p.mobilePhone, faMobileAlt, iconColor)}
          {renderPhone('Email', p.email, faEnvelope, iconColor)}
          <ProfileAddress />
        </ContactInfo>
      </CardContent>
    </>
  );
};

export default OSUProfile;
