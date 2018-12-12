import styled from 'styled-components';

// Wrapper divs to create 2 columns for desktops in a 70% / 30% split.
const tablet = `@media (min-width: 768px)`;

const DesktopGrid = styled.div`
  ${tablet} {
    display: flex;
    align-items: flex-start;
  }
`;

const MainColumn = styled.div`
  ${tablet} {
    width: 70%;
    margin-right: 1.6rem;
    & + div {
      width: 30%;
    }
  }
`;

export { DesktopGrid, MainColumn };
