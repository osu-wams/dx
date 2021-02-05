import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { debouncedApplicationSearchState } from 'src/state/search';

const GoogleSearchResults: React.FC<any> = () => {
  const gcseResults = useRef<HTMLDivElement>(null);
  const debouncedQuery = useRecoilValue(debouncedApplicationSearchState);

  useEffect(() => {
    if (debouncedQuery) {
      // @ts-ignore
      const gcseElement = window.google?.search?.cse?.element;
      if (gcseElement) {
        gcseElement.getElement('gcse-results').execute(debouncedQuery);
      }
    }
  }, [debouncedQuery]);

  return (
    <div style={{ display: debouncedQuery ? 'block' : 'none' }}>
      <div
        ref={gcseResults}
        className="gcse-searchresults-only"
        data-gname="gcse-results"
        data-testid="gcse-results"
        data-personalizedads="false"
        data-mobilelayout="true"
      ></div>
    </div>
  );
};

export default GoogleSearchResults;
