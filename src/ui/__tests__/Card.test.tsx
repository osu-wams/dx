import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from 'src/util/test-utils';
import { Card, CardContent, CardHeader, CardFooter, Badge } from '../Card';
import Button from '../Button';
import { Color } from 'src/theme';

jest.mock('uuid/v4', () => jest.fn(() => 'carduuid'));

// Standard card that is used most frequently in this app - should have thorough test coverage
const StandardCard = () => (
  <Card data-testid="StandardCard">
    <CardHeader
      data-testid="StandardCardHeader"
      title="Header"
      badge={<Badge color={Color['orange-400']}>{4}</Badge>}
    />
    <CardContent data-testid="StandardCardContent">Content</CardContent>
    <CardFooter data-testid="StandardCardFooter" infoButtonId="blah">
      <Button>View all</Button>
    </CardFooter>
  </Card>
);

const NonCollapsingCard = () => (
  <Card collapsing={false}>
    <CardHeader
      data-testid="StandardCardHeader"
      title="Header"
      badge={<Badge color={Color['orange-400']}>{4}</Badge>}
    />
  </Card>
);

const CardNoBadge = () => (
  <Card data-testid="CardNoBadge">
    <CardHeader data-testid="CardNoBadgeHeader" title="Header" />
    <CardContent>Content</CardContent>
    <CardFooter infoButtonId="blah">
      <Button>View all</Button>
    </CardFooter>
  </Card>
);

describe('<Card />', () => {
  it('should render', () => {
    const { getByTestId } = render(<StandardCard />);
    expect(getByTestId(/StandardCardContent/i)).toBeInTheDocument();
  });

  it('should display a title in the header', () => {
    const { getByTestId } = render(<StandardCard />);
    expect(getByTestId(/standardcardheader/i)).toHaveTextContent(/header/i);
  });

  it('should display a badge in the header if one is supplied', () => {
    const { getByTestId } = render(<StandardCard />);
    expect(getByTestId(/standardcardheader/i)).toHaveTextContent('4');
  });

  it('should not display a badge if no badge supplied', () => {
    const { getByTestId } = render(<CardNoBadge />);
    expect(getByTestId(/cardnobadgeheader/i)).toHaveTextContent('Header');
  });

  // !TODO: Visibility issues with latest update
  xit('should not display card content when collapsed', () => {
    const { getByTestId } = render(<StandardCard />);
    expect(getByTestId(/standardcardcontent/i)).not.toBeVisible();
  });

  // !TODO:  check visibility update test
  xit('should display card content when expanded', () => {
    const { getByTestId } = render(<StandardCard />);
    expect(getByTestId(/standardcardcontent/i)).not.toBeVisible();
    expect(getByTestId(/standardcardfooter/i)).not.toBeVisible();

    fireEvent.click(getByTestId('StandardCardHeader'));
    expect(getByTestId(/standardcardcontent/i)).toBeVisible();
    expect(getByTestId(/standardcardfooter/i)).toBeVisible();

    fireEvent.click(getByTestId('StandardCardHeader'));
    expect(getByTestId(/standardcardcontent/i)).not.toBeVisible();
    expect(getByTestId(/standardcardfooter/i)).not.toBeVisible();
  });

  it('should display card content by default on larger screens', () => {
    const { getByTestId } = render(<StandardCard />, { isDesktop: true });
    expect(getByTestId(/standardcardcontent/i)).toBeVisible();
  });

  it('should not be collapsible on mobile view when collapsing prop is set to false', () => {
    const { getByText } = render(<NonCollapsingCard />);

    // the svg icon for collapsing cards should not exist
    expect(getByText('Header').nextSibling).toBeNull();
  });

  it('should be collapsible on mobile view when collapsing prop is not defined or set to true', () => {
    const { getByText } = render(<StandardCard />);

    // the svg icon for collapsing cards should exist
    expect(getByText('Header').nextSibling).toBeInstanceOf(SVGSVGElement);
  });
});
