import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { formatPhone } from '../../../util/helpers';
import Icon from '../../../ui/Icon';
import { styled, themeSettings } from '../../../theme';

const renderPhone = (title: string, field: string | null, icon: any, color: string) => {
  if (field && title && icon) {
    return (
      <div>
        <dt>
          <Icon icon={icon} color={color} /> <VisuallyHidden>{title}</VisuallyHidden>
        </dt>
        <dd>{formatPhone(field)}</dd>
      </div>
    );
  }
};

const PersonName = styled.h3`
  color: ${({ theme }) => theme.features.profile.name.color};
  margin: 0;
  font-weight: 500;
  font-size: ${themeSettings.fontSize[24]};
`;

const PairData = styled.dl`
  margin: 0.5rem 0;
  display: flex;
  & > div {
    margin-right: 4rem;
  }
  dt {
    font-size: ${themeSettings.fontSize[12]};
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
      font-size: ${themeSettings.fontSize[24]};
    }
  }
`;

export { ContactInfo, PairData, PersonName, renderPhone };
