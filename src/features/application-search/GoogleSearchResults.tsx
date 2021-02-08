import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import { applicationSearchState } from 'src/state/applicationSearch';

const GoogleSearchResults: React.FC<any> = () => {
  const gcseResults = useRef<HTMLDivElement>(null);
  const search = useRecoilValue(applicationSearchState);

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

  return (
    <div style={{ display: search ? 'block' : 'none' }}>
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
