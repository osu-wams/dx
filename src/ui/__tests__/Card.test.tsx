import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from 'src/util/test-utils';
import { Card, CardContent, CardHeader, CardFooter, Badge } from '../Card';
import Button from '../Button';
import { Color } from '@osu-wams/theme';

jest.mock('nanoid', () => ({
  nanoid: () => Date.now() + 'test',
}));

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
    render(<StandardCard />);
    expect(screen.getByTestId(/StandardCardContent/i)).toBeInTheDocument();
  });

  it('should display a title in the header', () => {
    render(<StandardCard />);
    expect(screen.getByTestId(/standardcardheader/i)).toHaveTextContent(/header/i);
  });

  it('should display a badge in the header if one is supplied', () => {
    render(<StandardCard />);
    expect(screen.getByTestId(/standardcardheader/i)).toHaveTextContent('4');
  });

  it('should not display a badge if no badge supplied', () => {
    render(<CardNoBadge />);
    expect(screen.getByTestId(/cardnobadgeheader/i)).toHaveTextContent('Header');
  });

  // !TODO: Visibility issues with latest update
  xit('should not display card content when collapsed', () => {
    render(<StandardCard />);
    expect(screen.getByTestId(/standardcardcontent/i)).not.toBeVisible();
  });

  // !TODO:  check visibility update test
  xit('should display card content when expanded', () => {
    render(<StandardCard />);
    expect(screen.getByTestId(/standardcardcontent/i)).not.toBeVisible();
    expect(screen.getByTestId(/standardcardfooter/i)).not.toBeVisible();

    userEvent.click(screen.getByTestId('StandardCardHeader'));
    expect(screen.getByTestId(/standardcardcontent/i)).toBeVisible();
    expect(screen.getByTestId(/standardcardfooter/i)).toBeVisible();

    userEvent.click(screen.getByTestId('StandardCardHeader'));
    expect(screen.getByTestId(/standardcardcontent/i)).not.toBeVisible();
    expect(screen.getByTestId(/standardcardfooter/i)).not.toBeVisible();
  });

  it('should display card content by default on larger screens', () => {
    render(<StandardCard />, { isDesktop: true });
    expect(screen.getByTestId(/standardcardcontent/i)).toBeVisible();
  });

  it('should not be collapsible on mobile view when collapsing prop is set to false', () => {
    render(<NonCollapsingCard />);

    // the svg icon for collapsing cards should not exist
    expect(screen.getByText('Header').nextSibling).not.toBeInTheDocument();
  });

  it('should be collapsible on mobile view when collapsing prop is not defined or set to true', () => {
    render(<StandardCard />);

    // the svg icon for collapsing cards should exist
    expect(screen.getByText('Header').nextSibling).toBeInstanceOf(SVGSVGElement);
  });
});
