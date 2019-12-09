import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasisInline,
  HighlightDescription
} from '../../ui/Highlights';
import { themeSettings, styled } from '../../theme';
import { useAccountHolds } from '../../api/student';

const HoldsList = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  > li {
    font-size: ${themeSettings.fontSize[12]};
  }
`;

export const StudentHolds: React.FC = () => {
  const { data, loading } = useAccountHolds();
  return (
    <Highlight textAlignLeft>
      <HighlightTitle marginTop={0}>Holds</HighlightTitle>
      {loading && <Skeleton />}
      {!loading && (
        <HighlightDescription>
          <span>You have</span>
          <HighlightEmphasisInline> {data.length} </HighlightEmphasisInline>
          <span>{data.length !== 1 ? 'holds' : 'hold'} on your student account.</span>
          {data.length > 0 && (
            <HoldsList>
              {data.map((h, i) => h.description && <li key={i}>{h.description}</li>)}
            </HoldsList>
          )}
        </HighlightDescription>
      )}
    </Highlight>
  );
};

export default StudentHolds;
