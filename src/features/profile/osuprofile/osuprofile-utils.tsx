import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import styled from 'styled-components/macro';
import { Helpers } from '@osu-wams/utils';
import Icon from 'src/ui/Icon';
import { fontSize } from '@osu-wams/theme';

const renderListItem = (title: string, field: string | null, icon: any, color: string) => {
  if (field && title && icon) {
    return (
      <div>
        <dt>
          <Icon icon={icon} color={color} /> <VisuallyHidden>{title}</VisuallyHidden>
        </dt>
        <dd>{Helpers.formatPhone(field)}</dd>
      </div>
    );
  }
};

const PairData = styled.dl`
  margin: 0.5rem 0;
  display: flex;
  & > div {
    margin-right: 4rem;
  }
  dt {
    font-size: ${fontSize[12]};
    font-weight: 600;
    color: ${({ theme }) => theme.features.profile.detail.color};
  }
  dd {
    margin-left: 0;
  }
`;

const ContactInfo = styled.dl`
  dt,
  dd {
    display: inline-block;
    vertical-align: top;
    padding-bottom: 1.8rem;
    svg {
      font-size: ${fontSize[24]};
    }
  }
`;

export { ContactInfo, PairData, renderListItem };
