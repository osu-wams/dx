import React, { useState, useEffect } from 'react';
import { State } from '@osu-wams/hooks';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@osu-wams/theme';
import { SearchBar } from 'src/ui/SearchBar';
import { useRecoilState, useResetRecoilState } from 'recoil';

const {
  selectedTrainingTagState,
  trainingSearchState,
  debouncedTrainingSearchState,
  selectedTrainingAudienceState,
} = State;

const TrainingsSearch: React.FC<any> = () => {
  const [query, setQuery] = useRecoilState(trainingSearchState);
  const [input, setInput] = useState('');
  const resetDebouncedQuery = useResetRecoilState(debouncedTrainingSearchState);
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTrainingTagState);
  const [selectedAudience, setSelectedAudience] = useRecoilState(selectedTrainingAudienceState);

  const isDesktop = useMediaQuery({ query: `(min-width: ${breakpoints.small})` });

  useEffect(() => {
    setInput(query);
  }, [query]);

  const onChange = (event) => {
    const newValue = event.target.value;
    setInput(newValue);
    if (!newValue.length) resetDebouncedQuery();
    if (selectedTag !== 'all') setSelectedTag('all');
    if (selectedAudience !== 'all') setSelectedAudience('all');
    // Expensive function, let it operate async, state updates will cause related values
    // to refresh and render to happen asap
    setTimeout(() => setQuery(newValue));
  };

  return (
    <SearchBar
      id="trainingsSearch"
      labelText="Search for trainings"
      inputValue={input}
      onChange={onChange}
      autoFocus={isDesktop ? true : false} // eslint-disable-line
    />
  );
};

export default TrainingsSearch;
