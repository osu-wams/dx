describe('Main navigation', () => {
  // Tests were inconsistent before adding this load application and 3 second delay.
  it('Loads the homepage', () => {
    cy.visit('/')
      .getByTestId('dashboard-page')
      .wait(3000);
  });

  it('Can navigate to the Academics page', () => {
    cy.get('[href="/academics"]')
      .click()
      .getByTestId('academics-page');
  });

  it('Can navigate to the Finances page', () => {
    //cy.visit('/');
    cy.get('[href="/finances"]')
      .click()
      .getByTestId('finances-page');
  });

  it('Can navigate to the Experience page', () => {
    //cy.visit('/');
    cy.get('[href="/experience"]')
      .click()
      .getByTestId('experience-page');
  });

  it('Can navigate to the Resources page', () => {
    //cy.visit('/');
    cy.get('[href="/resources"]')
      .click()
      .getByTestId('resources-page');
  });

  it('Can navigate back to the Homepage', () => {
    //cy.visit('/academics');
    cy.getByText('Home')
      .click()
      .getByTestId('dashboard-page');
  });
});
