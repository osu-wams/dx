import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';
import { useDebounce } from 'use-debounce';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { Grades } from '../../api/student/grades';
import { getGrades } from '../../api/student';
import PlainCard from '../../ui/PlainCard';
import { Color } from '../../theme';
import Input from '../../ui/Input';
import Icon from '../../ui/Icon';
import PageTitle from '../../ui/PageTitle';
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
import { MainGridWrapper, MainGrid, MainGridCol } from '../../ui/PageGrid';
import { AcademicSubNav } from './AcademicsSubNav';

const AcademicHistory = () => {
  const [grades, setGrades] = useState<Grades[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [gradesLoading, setGradesLoading] = useState<boolean>(true);
  const [filteredGrades, setFilteredGrades] = useState<Grades[]>([]);

  // Populate user grades
  useEffect(() => {
    let isMounted = true;
    getGrades()
      .then(data => {
        if (isMounted) {
          setGrades(data);
          setFilteredGrades(data);
          setGradesLoading(false);
        }
      })
      .catch(console.log);

    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setFilteredGrades(grades);
    } else {
      const re = new RegExp(debouncedQuery, 'gi');
      const matchingGrades = grades.filter(
        e =>
          e.attributes.courseTitle.match(re) ||
          `${e.attributes.courseSubject}${e.attributes.courseNumber}`.match(re) ||
          `${e.attributes.courseSubject} ${e.attributes.courseNumber}`.match(re)
      );
      setFilteredGrades(matchingGrades);
      Event('academic-history-search', debouncedQuery);
    }
  }, [debouncedQuery, grades]);

  const gradesByTerm = filteredGrades.reduce(
    (gradesSoFar, { attributes, attributes: { termDescription } }) => {
      if (!gradesSoFar[termDescription]) gradesSoFar[termDescription] = [];
      gradesSoFar[termDescription].push(attributes);
      return gradesSoFar;
    },
    {}
  );

  return (
    <MainGridWrapper data-testid="academic-history">
      <PageTitle title="Academic History" />
      <AcademicSubNav />
      <MainGrid>
        <MainGridCol className="col-span-2">
          <SearchWrapper>
            <Icon icon={faSearch} color={Color['neutral-600']} />
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
          {gradesLoading && <Skeleton count={5} />}
          {grades.length > 0 ? (
            <div aria-live="polite" aria-atomic="true">
              {Object.keys(gradesByTerm).map((key, index) => (
                <PlainCard title={key} key={index}>
                  <Table variant="basic" stretch>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell>Course Code</TableHeaderCell>
                        <TableHeaderCell>Final Grade</TableHeaderCell>
                        <TableHeaderCell>Course Title</TableHeaderCell>
                        <TableHeaderCell>Credits</TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gradesByTerm[key].map(
                        (
                          { courseNumber, courseSubject, creditHours, gradeFinal, courseTitle },
                          subindex
                        ) => {
                          return (
                            <TableRow key={subindex}>
                              <TableCell>
                                <strong>
                                  {courseSubject} {courseNumber}
                                </strong>
                              </TableCell>
                              <TableCell>{gradeFinal}</TableCell>
                              <TableCell>{titleCase(courseTitle)}</TableCell>
                              <TableCell>
                                {creditHours} {singularPlural(creditHours, 'Credit')}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </PlainCard>
              ))}
            </div>
          ) : (
            !gradesLoading && <div>No course history yet</div>
          )}
        </MainGridCol>
      </MainGrid>
    </MainGridWrapper>
  );
};

export default AcademicHistory;

const SearchWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 1rem;
    left: 1.2rem;
  }
  margin-bottom: 2rem;
`;
const FilterInput = styled(Input)`
  width: 100%;
  padding-left: 4rem;
`;
