import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Loading } from 'src/ui/Loading';
import { fontSize, spacing, breakpoints, MainGridWrapper, MainGrid } from 'src/theme';
import PageTitle from 'src/ui/PageTitle';
import { Card, CardHeader, CardContent } from 'src/ui/Card';
import { Table, TableBody, TableRow, TableCell, TableHeader, TableHeaderCell } from 'src/ui/Table';
import { singularPlural, titleCase } from 'src/util/helpers';
import { Event } from 'src/util/gaTracking';
import { AcademicSubNav } from './AcademicsSubNav';
import { SearchBar } from 'src/ui/SearchBar';
import useGradesState from 'src/hooks/useGradesState';
import { useRecoilValue } from 'recoil';
import { debouncedGradesSearchState, filteredGradesState, gradesSearchState } from 'src/state';
import useDebouncedSearchState from 'src/hooks/useDebouncedSearchState';

const PastCourses = () => {
  const { grades } = useGradesState();
  const { debouncedQuery, query, setQuery } = useDebouncedSearchState({
    searchState: gradesSearchState,
    debouncedSearchState: debouncedGradesSearchState,
    timeout: 250,
  });
  const filteredGrades = useRecoilValue(filteredGradesState);

  useEffect(() => {
    if (debouncedQuery) {
      // If a query has no results, emit a GA Event to track for improving grades
      if (filteredGrades.length === 0) {
        Event('grades-search-failed', debouncedQuery);
      }

      // Avoids sending single characters to Google Analytics
      if (debouncedQuery.length >= 2 && filteredGrades.length > 0) {
        Event('grades-search', debouncedQuery);
      }
    }
  }, [debouncedQuery, filteredGrades]);

  const gradesByTerm = filteredGrades.reduce(
    (gradesSoFar, { attributes, attributes: { termDescription } }) => {
      if (!gradesSoFar[termDescription]) gradesSoFar[termDescription] = [];
      gradesSoFar[termDescription].push(attributes);
      return gradesSoFar;
    },
    {}
  );

  // Make Cards Expanded (collapse: false) when searching or the first card
  const CardCollapse = (index: number, query) => {
    if (index < 2 || query.length > 1) {
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
        {grades.isLoading && <Loading lines={5} />}
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
                            courseReferenceNumber,
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
                                {courseReferenceNumber && (
                                  <CourseData>CRN: {courseReferenceNumber}</CourseData>
                                )}
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
          !grades.isLoading && <div>No course history yet</div>
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

  @media (min-width: ${breakpoints.medium}) {
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
  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${spacing.desktop};
  }
`;
