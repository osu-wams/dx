import React from 'react';
import { Loading } from 'src/ui/Loading';
import styled from 'styled-components/macro';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasisInline,
  HighlightDescription,
} from 'src/ui/Highlights';
import { fontSize } from 'src/theme';
import { useHolds } from '@osu-wams/hooks';
import { singularPlural } from 'src/util/helpers';

const HoldsList = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  > li {
    font-size: ${fontSize[12]};
  }
`;

export const StudentHolds: React.FC = () => {
  const { data, loading } = useHolds();
  return (
    <Highlight textAlignLeft>
      <HighlightTitle marginTop={0}>Holds</HighlightTitle>
      {loading && <Loading />}
      {!loading && (
        <HighlightDescription>
          <span>You have</span>
          <HighlightEmphasisInline> {data.length}</HighlightEmphasisInline>
          <span> {singularPlural(data.length, 'hold')} on your student account.</span>
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
