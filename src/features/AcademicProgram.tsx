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
  const degrees = useDegrees();
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
   * @param fields
   * @param degreeData
   */
  const renderItem = (fields: (string | null) | (string | null)[], degreeData: degreeInfo) => {
    if (!fields) {
      return;
    }

    if (fields && Array.isArray(fields)) {
      fields = fields.filter(Boolean).join(', ');
    }

    return (
      <ListItem>
        <ListItemContent>
          <Icon icon={degreeData.icon} />
          <ListItemText>
            {fields}
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
      {degrees.isLoading && <Loading />}
      {!degrees.isLoading && degrees.data && degrees.data.length === 0 && (
        <CardContent>
          <NoDegreeData />
        </CardContent>
      )}
      {!degrees.isLoading &&
        degrees.data &&
        degrees.data.map((d: { attributes: Types.Degree }, i: number) => (
          <CardContent
            style={i === 0 ? { paddingBottom } : { borderTop }}
            className={`degree-card degree-card-${i}`}
            key={i}
          >
            <List>
              {d.attributes?.majors?.first?.major &&
                renderItem(
                  [d.attributes.majors.first.major, d.attributes.majors.first.department],
                  degreeData.major
                )}
              {d.attributes.majors.second &&
                renderItem(
                  [d.attributes.majors.second.major, d.attributes.majors.second.department],
                  degreeData.major
                )}
              {d.attributes.majors.third &&
                renderItem(
                  [d.attributes.majors.third.major, d.attributes.majors.third.department],
                  degreeData.major
                )}
              {d.attributes.majors.fourth &&
                renderItem(
                  [d.attributes.majors.fourth.major, d.attributes.majors.fourth.department],
                  degreeData.major
                )}

              {renderItem(d.attributes.minors.first, degreeData.minor)}
              {renderItem(d.attributes.minors.second, degreeData.minor)}
              {renderItem(d.attributes.minors.third, degreeData.minor)}
              {renderItem(d.attributes.minors.fourth, degreeData.minor)}

              {renderItem(d.attributes.degree, degreeData.degree)}

              {renderItem(d.attributes.college, degreeData.college)}

              {campusName && renderItem(Helpers.titleCase(campusName), degreeData.campus)}
            </List>
          </CardContent>
        ))}
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
