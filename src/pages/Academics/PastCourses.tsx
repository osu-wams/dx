import React, { useContext, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import VisuallyHidden from '@reach/visually-hidden';
import { useDebounce } from 'use-debounce';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { Grades } from '../../api/student/grades';
import { useGrades } from '../../api/student';
import {
  themeSettings,
  breakpoints,
  styled,
  ThemeContext,
  MainGridWrapper,
  MainGrid
} from '../../theme';
import Input from '../../ui/Input';
import Icon from '../../ui/Icon';
import PageTitle from '../../ui/PageTitle';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHeaderCell
} from '../../ui/Table';
import { singularPlural, titleCase } from '../../util/helpers';
import { Event } from '../../util/gaTracking';
import { AcademicSubNav } from './AcademicsSubNav';

const PastCourses = () => {
  const themeContext = useContext(ThemeContext);
  const grades = useGrades();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [filteredGrades, setFilteredGrades] = useState<Grades[]>([]);

  useEffect(() => {
    if (!debouncedQuery) {
      setFilteredGrades(grades.data);
    } else {
      const re = new RegExp(debouncedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matchingGrades = grades.data.filter(
        e =>
          e.attributes.courseTitle.match(re) ||
          `${e.attributes.courseSubject}${e.attributes.courseNumber}`.match(re) ||
          `${e.attributes.courseSubject} ${e.attributes.courseNumber}`.match(re) ||
          `${e.attributes.courseSubjectDescription}`.match(re) ||
          `${e.attributes.gradeFinal}`.match(re)
      );
      setFilteredGrades(matchingGrades);
      Event('past-courses-search', debouncedQuery);
    }
  }, [debouncedQuery, grades.data]);

  const gradesByTerm = filteredGrades.reduce(
    (gradesSoFar, { attributes, attributes: { termDescription } }) => {
      if (!gradesSoFar[termDescription]) gradesSoFar[termDescription] = [];
      gradesSoFar[termDescription].push(attributes);
      return gradesSoFar;
    },
    {}
  );

  // Make Cards Expended (collapse: false) when searching or the first card
  const CardCollapse = (index: number, query) => {
    if (index === 0 || query.length > 1) {
      return false;
    }
  };

  return (
    <MainGridWrapper data-testid="past-courses">
      <PageTitle title="Past Courses" />
      <AcademicSubNav />
      <MainGrid>
        <SearchWrapper>
          <Icon
            icon={faSearch}
            color={themeContext.features.academics.pastCourses.search.icon.color}
          />
          <VisuallyHidden>
            <label htmlFor="course-filter">Find courses</label>
          </VisuallyHidden>
          <FilterInput
            type="text"
            placeholder="Find past courses"
            value={query}
            id="course-filter"
            onChange={e => setQuery(e.target.value)}
          />
        </SearchWrapper>
        {grades.loading && <Skeleton count={5} />}
        {grades.data.length > 0 ? (
          <HistoryGrid aria-live="polite" aria-atomic="true">
            {Object.keys(gradesByTerm).map((key, index) => (
              <HistoryCard key={index} collapsing={CardCollapse(index, query)}>
                <CardHeader title={key} />
                <CardContent className="flush">
                  <Table variant="spacious" stretch>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell>Course</TableHeaderCell>
                        <TableHeaderCell>Final Grade</TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gradesByTerm[key].map(
                        (
                          {
                            courseNumber,
                            courseSubject,
                            repeatedCourseInd,
                            creditHours,
                            gradeFinal,
                            courseTitle
                          },
                          subindex
                        ) => {
                          return (
                            <TableRow key={subindex}>
                              <TableCell>
                                <CourseTitle>{titleCase(courseTitle)}</CourseTitle>
                                <CourseData>
                                  <strong>
                                    {courseSubject} {courseNumber} &middot;
                                  </strong>{' '}
                                  {creditHours} {singularPlural(creditHours, 'Credit')}
                                </CourseData>
                              </TableCell>
                              <TableCell>
                                <Grade>{gradeFinal}</Grade>
                                {repeatedCourseInd && repeatedCourseInd === 'E' && (
                                  <ExcludedFromGPA>Excluded - GPA/Credits</ExcludedFromGPA>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </HistoryCard>
            ))}
          </HistoryGrid>
        ) : (
          !grades.loading && <div>No course history yet</div>
        )}
      </MainGrid>
    </MainGridWrapper>
  );
};

export default PastCourses;

const HistoryCard = styled(Card)`
  margin-bottom: 0;
`;

const ExcludedFromGPA = styled.div`
  font-size: ${themeSettings.fontSize[12]};
  margin: 0 auto;
  text-align: center;
`;

const Grade = styled.span`
  font-size: ${themeSettings.fontSize[24]};
  color: ${({ theme }) => theme.features.academics.pastCourses.grade.color};
  display: block;
  text-align: center;
`;

const CourseTitle = styled.span`
  color: ${({ theme }) => theme.features.academics.pastCourses.title.color};
`;
const CourseData = styled.div`
  font-size: ${themeSettings.fontSize[14]};
`;

const SearchWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 2rem;
    right: 1.6rem;
    font-size: ${themeSettings.fontSize[24]};
  }
  margin-bottom: 2rem;
`;
const FilterInput = styled(Input)`
  width: 100%;
  padding: 1.6rem;
  font-size: ${themeSettings.fontSize[24]};
`;

const HistoryGrid = styled.div`
  max-width: ${breakpoints[1024]};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: ${themeSettings.spacing.mobile};
  grid-auto-rows: minmax(min-content, max-content);
  & > div {
    height: min-content;
  }
  @media screen and (min-width: ${breakpoints[768]}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${themeSettings.spacing.desktop};
  }
`;
