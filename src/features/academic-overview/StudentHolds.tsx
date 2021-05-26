import React from 'react';
import { Loading } from 'src/ui/Loading';
import styled from 'styled-components/macro';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasisInline,
  HighlightDescription,
} from 'src/ui/Highlights';
import { fontSize } from '@osu-wams/theme';
import { useHolds } from '@osu-wams/hooks';
import { Helpers } from '@osu-wams/utils';

const HoldsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  > li {
    padding: 15px 0 0 0;
  }
`;

const HoldTitle = styled.div`
  color: ${({ theme }) => theme.ui.list.item.header.color};
  font-size: ${fontSize[14]};
`;

const HoldDescription = styled.div`
  color: ${({ theme }) => theme.ui.list.item.description.color};
  font-size: ${fontSize[13]};
`;

export const StudentHolds: React.FC = () => {
  const { data, isLoading, isSuccess } = useHolds();

  return (
    <Highlight textAlignLeft>
      <HighlightTitle marginTop={0}>Holds</HighlightTitle>
      {isLoading && <Loading />}
      {isSuccess && data && (
        <HighlightDescription>
          <span>You have</span>
          <HighlightEmphasisInline> {data.length}</HighlightEmphasisInline>
          <span> {Helpers.singularPlural(data.length, 'hold')} on your student account.</span>
          {data.length > 0 && (
            <HoldsList>
              {data.map(
                (h, i) =>
                  h.description && (
                    <li key={i}>
                      <HoldTitle>{h.description}</HoldTitle>
                      <HoldDescription>Effective {Helpers.format(h.fromDate)}</HoldDescription>
                      {h.reason && <HoldDescription>{h.reason}</HoldDescription>}
                    </li>
                  )
              )}
            </HoldsList>
          )}
        </HighlightDescription>
      )}
    </Highlight>
  );
};

export default StudentHolds;
