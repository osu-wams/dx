import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Loading } from 'src/ui/Loading';
import { useDebounce } from 'use-debounce';
import { useGrades } from '@osu-wams/hooks';
import { fontSize, spacing, breakpoints, MainGridWrapper, MainGrid } from 'src/theme';
import PageTitle from 'src/ui/PageTitle';
import { Card, CardHeader, CardContent } from 'src/ui/Card';
import { Table, TableBody, TableRow, TableCell, TableHeader, TableHeaderCell } from 'src/ui/Table';
import { singularPlural, titleCase } from 'src/util/helpers';
import { Event } from 'src/util/gaTracking';
import { AcademicSubNav } from './AcademicsSubNav';
import { Grades } from '@osu-wams/hooks/dist/api/student/grades';
import { SearchBar } from 'src/ui/SearchBar';

const PastCourses = () => {
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
        (e) =>
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
        <SearchBar
          id="course-filter"
          labelText="Find past courses"
          inputValue={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {grades.loading && <Loading lines={5} />}
        {grades.data.length > 0 ? (
          <HistoryGrid aria-live="polite" aria-atomic="true">
            <Count>
              Found {filteredGrades.length} {singularPlural(filteredGrades.length, 'course')}
            </Count>
            {Object.keys(gradesByTerm).map((key, index) => (
              <HistoryCard key={index} collapsing={CardCollapse(index, query)}>
                <CardHeader title={key} />
                <CardContent flush>
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
                            courseTitle,
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
  font-size: ${fontSize[12]};
  margin: 0 auto;
  text-align: center;
`;

const Grade = styled.span`
  font-size: ${fontSize[24]};
  color: ${({ theme }) => theme.features.academics.pastCourses.grade.color};
  display: block;
  text-align: center;
`;

const Count = styled.span`
  @media (min-width: ${breakpoints.xs}) {
    grid-column: 1/3;
  }

  @media (min-width: ${breakpoints.small}) {
    grid-column: 1/4;
  }
`;

const CourseTitle = styled.span`
  color: ${({ theme }) => theme.features.academics.pastCourses.title.color};
`;
const CourseData = styled.div`
  font-size: ${fontSize[14]};
`;

const HistoryGrid = styled.div`
  max-width: ${breakpoints.large};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-row-gap: ${spacing.mobile};
  grid-auto-rows: minmax(min-content, max-content);
  & > div {
    height: min-content;
  }
  @media (min-width: ${breakpoints.xs}) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${spacing.mobile};
  }
  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${spacing.desktop};
  }
`;
