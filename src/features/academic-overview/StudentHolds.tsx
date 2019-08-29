import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { Highlight, HighlightTitle, HighlightEmphasisInline, HighlightDescription } from '../../ui/Highlights';
import { theme, Color } from '../../theme';
import { getAccountHolds } from '../../api/student';
import { Hold } from '../../api/student/holds';

const HoldsList = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  color: ${Color['neutral-550']};
  > li {
    font-size: ${theme.fontSize[12]};
  }
`;

type AccountHoldsResponse = Hold[];

interface HoldsState {
  items: Hold[];
  text: string;
}

export const StudentHolds: React.FC = () => {
  const [ holds, setHolds ] = useState<HoldsState>({
    items: [],
    text: 'holds'
  });
  const [ holdsLoading, setHoldsLoading ] = useState<boolean>(true);

  useEffect(() => {
    getAccountHolds()
      .then((items: AccountHoldsResponse) => {
        if (items.length > 0) {
          let text = 'holds';
          if (items.length === 1) text = 'hold';
          setHolds({ items, text });
        }
        setHoldsLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <Highlight textAlignLeft>
      <HighlightTitle marginTop={0}>Holds</HighlightTitle>
      {holdsLoading && <Skeleton />}
      {!holdsLoading && (
        <HighlightDescription>
          <span>You have</span>
          <HighlightEmphasisInline> {holds.items.length} </HighlightEmphasisInline>
          <span>{holds.text} on your student account.</span>
          {holds.items.length > 0 && (
            <HoldsList>{holds.items.map((h, i) => <li key={i}>{h.description}</li>)}</HoldsList>
          )}
        </HighlightDescription>
      )}
    </Highlight>
  );
};

export default StudentHolds;
