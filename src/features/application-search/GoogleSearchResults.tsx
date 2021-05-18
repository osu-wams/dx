import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { Card, CardHeader, CardContent } from 'src/ui/Card';
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import { State } from '@osu-wams/hooks';
import { borderRadius, spacing } from '@osu-wams/theme';

const SearchResultsContainer = styled.div<{ search?: string }>`
  display: ${(props) => (props.search ? 'block' : 'none')};
  padding: 5px;
  background-color: #fff;
  border-radius: ${borderRadius[16]};
  margin-bottom: ${spacing.default};
`;

const GoogleSearchResults: React.FC<any> = () => {
  const gcseResults = useRef<HTMLDivElement>(null);
  const search = useRecoilValue(State.applicationSearchState);

  useEffect(() => {
    if (search) {
      // @ts-ignore window.google exists after async script in Helmet is loaded
      const element = window.google?.search?.cse?.element;
      const gcseElement = element?.getElement('gcse-results');
      if (gcseElement) {
        gcseElement.execute(search);
      }
    }
  }, [search]);

  return search ? (
    <Card>
      <CardHeader title="OSU Search Results" />
      <CardContent>
        <SearchResultsContainer search={search}>
          <Helmet>
            <script
              async
              src="https://cse.google.com/cse.js?cx=001157565620839607635:f_5ovr-jasm"
            ></script>
          </Helmet>
          <div
            ref={gcseResults}
            className="gcse-searchresults-only"
            data-gname="gcse-results"
            data-testid="gcse-results"
            data-personalizedads="false"
            data-mobilelayout="true"
          ></div>
        </SearchResultsContainer>
      </CardContent>
    </Card>
  ) : null;
};

export default GoogleSearchResults;
