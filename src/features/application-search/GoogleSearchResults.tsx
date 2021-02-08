import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRecoilState } from 'recoil';
import { applicationSearchState } from 'src/state/applicationSearch';
import { useLocation } from '@reach/router';

const GoogleSearchResults: React.FC<any> = () => {
  const location = useLocation();
  const gcseResults = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useRecoilState(applicationSearchState);

  // If navigating to the page programatically, check location state (window.history)
  // for a query to initialize the page with after Google Custom Search is initialized
  useEffect(() => {
    // @ts-ignore Reach Router location state provided during navigate
    const locationQuery = location.state.query;
    if (locationQuery) {
      // Shameless hack way to cause Google Custom Search (GCSE) to execute after first render when
      // gcse-results div isn't ready to execute for search results.
      // I can't find a better way (tried Googles recommended callback) as well as a few others.
      // https://developers.google.com/custom-search/docs/element#callbacks
      setTimeout(() => setQuery(locationQuery), 10);
    }
  }, []);

  useEffect(() => {
    if (query) {
      // @ts-ignore window.google exists after async script in Helmet is loaded
      const element = window.google?.search?.cse?.element;
      const gcseElement = element?.getElement('gcse-results');
      if (gcseElement) {
        gcseElement.execute(query);
      }
    }
  }, [query]);

  return (
    <div style={{ display: query ? 'block' : 'none' }}>
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
    </div>
  );
};

export default GoogleSearchResults;
