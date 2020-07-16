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
import { useDegrees } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import Skeleton from 'react-loading-skeleton';
import { List, ListItem, ListItemContent, ListItemDescription, ListItemText } from 'src/ui/List';
import Icon from 'src/ui/Icon';
import { AppContext } from 'src/contexts/app-context';
import { ExternalLink } from 'src/ui/Link';
import Url from 'src/util/externalUrls.data';
import { Event } from 'src/util/gaTracking';
import { titleCase } from 'src/util/helpers';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';
import degreeImg from 'src/assets/program-of-study.svg';
import { ThemeContext } from 'styled-components/macro';

const { usersCampus } = User;

const AcademicProgram = () => {
  const themeContext = useContext(ThemeContext);
  const { data, loading }: { data: Types.Degree[]; loading: boolean } = useDegrees();
  const { user } = React.useContext(AppContext);
  const { campusName } = usersCampus(user);

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

    if (fields && Array.isArray(fields) && fields.length > 1) {
      fields = fields.join(', ');
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
      {loading && <Skeleton />}
      {!loading && data.length === 0 && (
        <CardContent>
          <NoDegreeData />
        </CardContent>
      )}
      {!loading &&
        data &&
        data.map((d: Types.Degree, i: number) => (
          <CardContent
            style={i === 0 ? { paddingBottom } : { borderTop }}
            className={`degree-card degree-card-${i}`}
            key={i}
          >
            <List>
              {d?.majors?.first?.major &&
                renderItem([d.majors.first.major, d.majors.first.department], degreeData.major)}
              {d.majors.second &&
                renderItem([d.majors.second.major, d.majors.second.department], degreeData.major)}
              {d.majors.third &&
                renderItem([d.majors.third.major, d.majors.third.department], degreeData.major)}
              {d.majors.fourth &&
                renderItem([d.majors.fourth.major, d.majors.fourth.department], degreeData.major)}

              {renderItem(d.minors.first, degreeData.minor)}
              {renderItem(d.minors.second, degreeData.minor)}
              {renderItem(d.minors.third, degreeData.minor)}
              {renderItem(d.minors.fourth, degreeData.minor)}

              {renderItem(d.degree, degreeData.degree)}

              {renderItem(d.college, degreeData.college)}

              {campusName && renderItem(titleCase(campusName), degreeData.campus)}
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
