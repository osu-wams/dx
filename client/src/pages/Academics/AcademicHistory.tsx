import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { Grades } from '../../api/student/grades';
import { getGrades } from '../../api/student';
import PlainCard from '../../ui/PlainCard';
import { Color } from '../../theme';
import Input from '../../ui/Input';
import Icon from '../../ui/Icon';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHeaderCell
} from '../../ui/Table';
import { singularPlural, titleCase } from '../../util/helpers';
import useDebounce from '../../util/useDebounce';

const AcademicHistory = () => {
  const [grades, setGrades] = useState<Grades[]>([]);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [filteredGrades, setFilteredGrades] = useState<Grades[]>([]);

  // Populate user grades
  useEffect(() => {
    getGrades()
      .then(data => {
        setGrades(data);
        setFilteredGrades(data);
      })
      .catch(console.log);
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
    <>
      <SearchWrapper>
        <Icon icon={faSearch} color={Color['neutral-600']} />
        <FilterInput
          type="text"
          placeholder="Find past courses"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </SearchWrapper>
      <div aria-live="polite">
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
    </>
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
