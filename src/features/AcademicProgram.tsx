import React, { useContext } from 'react';
import {
  faUserGraduate,
  faDiploma,
  faFileCertificate,
  faUniversity,
  faGraduationCap,
  faMapMarkerAlt,
} from '@fortawesome/pro-light-svg-icons';
import { User } from '@osu-wams/hooks';
import { Card, CardHeader, CardContent, CardIcon, CardFooter } from 'src/ui/Card';
import { State, useDegrees } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { Url, Helpers } from '@osu-wams/utils';
import { Loading } from 'src/ui/Loading';
import { List, ListItem, ListItemContent, ListItemDescription, ListItemText } from 'src/ui/List';
import Icon from 'src/ui/Icon';
import { ExternalLink } from 'src/ui/Link';
import { Event } from 'src/util/gaTracking';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';
import degreeImg from 'src/assets/program-of-study.svg';
import { ThemeContext } from 'styled-components/macro';
import { useRecoilValue } from 'recoil';

const { usersCampus } = User;

const AcademicProgram = () => {
  const themeContext = useContext(ThemeContext);
  const { isLoading, data } = useDegrees();
  const user = useRecoilValue(State.userState);
  const { campusName } = usersCampus(user.data);

  const degreeData = {
    major: {
      description: 'Major and Department',
      icon: faDiploma,
    },
    minor: {
      description: 'Minor',
      icon: faFileCertificate,
    },
    college: {
      description: 'College',
      icon: faUniversity,
    },
    degree: {
      description: 'Degree',
      icon: faGraduationCap,
    },
    campus: {
      description: 'Campus',
      icon: faMapMarkerAlt,
    },
  };

  interface degreeInfo {
    description: string;
    icon: any;
  }

  interface degreeMajor {
    major: string | null;
    department: string | null;
  }

  const NoDegreeData = () => (
    <EmptyState>
      <EmptyStateImage src={degreeImg} alt="" />
      <EmptyStateText>
        You do not currently have an academic program. If you have recently enrolled or changed your
        program, it may take a little while to appear.
      </EmptyStateText>
    </EmptyState>
  );

  /**
   * Renders or skips individual items from the program of study
   * @param degree
   * @param degreeData
   */
  const renderItem = (degree: degreeMajor | string | null, degreeData: degreeInfo) => {
    if (!degree) {
      return;
    }

    // Coerce the degreeMajor, string, or null into an array of string/null for filter and joining below
    let fields: (string | null)[];
    if (Object.keys(degree).some((k) => k === 'major')) {
      const { major, department } = degree as degreeMajor;
      fields = [major, department];
    } else {
      fields = [degree.toString()];
    }

    return (
      <ListItem>
        <ListItemContent>
          <Icon icon={degreeData.icon} />
          <ListItemText>
            {fields.filter(Boolean).join(', ')}
            <ListItemDescription>{degreeData.description}</ListItemDescription>
          </ListItemText>
        </ListItemContent>
      </ListItem>
    );
  };

  const paddingBottom = themeContext.features.academics.academicProgram.first.paddingBottom;
  const borderTop = themeContext.features.academics.academicProgram.rest.borderTop;

  return (
    <Card>
      <CardHeader title="My Academic Program" badge={<CardIcon icon={faUserGraduate} />} />
      {isLoading && <Loading />}
      {!isLoading && data && data.length === 0 && (
        <CardContent>
          <NoDegreeData />
        </CardContent>
      )}
      {!isLoading &&
        data &&
        data.map(
          (
            { attributes: { majors, minors, degree, college } }: { attributes: Types.Degree },
            i: number
          ) => (
            <CardContent
              style={i === 0 ? { paddingBottom } : { borderTop }}
              className={`degree-card degree-card-${i}`}
              key={i}
            >
              <List>
                {renderItem(majors.first, degreeData.major)}
                {renderItem(majors.second, degreeData.major)}
                {renderItem(majors.third, degreeData.major)}
                {renderItem(majors.fourth, degreeData.major)}
                {renderItem(minors.first, degreeData.minor)}
                {renderItem(minors.second, degreeData.minor)}
                {renderItem(minors.third, degreeData.minor)}
                {renderItem(minors.fourth, degreeData.minor)}
                {renderItem(degree, degreeData.degree)}
                {renderItem(college, degreeData.college)}
                {campusName && renderItem(Helpers.titleCase(campusName), degreeData.campus)}
                {console.log(degree, college, campusName)}
              </List>
            </CardContent>
          )
        )}
      <CardFooter>
        <ExternalLink
          href={Url.banner.studentProfile}
          onClick={() =>
            Event('program-of-study', 'View Student Profile', Url.banner.studentProfile)
          }
        >
          View Student Profile
        </ExternalLink>
      </CardFooter>
    </Card>
  );
};

export { AcademicProgram };
