import MUICardHeader from '@material-ui/core/CardHeader';
import styled from 'styled-components';

// Sets the background color of Card Headers
function bgColor(color) {
  switch (color) {
    case 'stratosphere':
      return '#006A8E';
    case 'orange':
      return '#d73f09';
    case 'pinestand':
      return '#4A773C';
    case 'black':
      return '#000';
    case 'charcoal':
      return '#555';
    default:
      return '';
  }
}

// Sets the title color, currently used for icon color as well
function titleColor(color) {
  switch (color) {
    case 'stratosphere':
    case 'pinestand':
    case 'black':
    case 'orange':
    case 'charcoal':
      return '#fff';
    default:
      return '';
  }
}

const CardHeader = styled(MUICardHeader)`
  & {
    background-color: ${({ color }) => bgColor(color)} div > span {
      /* targets header title */
      color: ${({ color }) => titleColor(color)};
    }
    div + div {
      /* targets header icons */
      color: ${({ color }) => titleColor(color)};
    }
  }
`;

export default CardHeader;
