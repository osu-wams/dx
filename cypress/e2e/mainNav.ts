describe('Main navigation', () => {
  // Tests were inconsistent before adding this load application and 3 second delay.
  it('Loads the homepage', () => {
    cy.visit('/')
      .findByTestId('employee-dashboard-page')
      .wait(3000);
  });

  it('Can navigate to the Beta page', () => {
    cy.get('[href="/beta"]:first')
      .click()
      .findByTestId('betadash-page');
  });

  it('Can navigate to the Resources page', () => {
    //cy.visit('/');
    cy.get('[href="/resources"]')
      .click()
      .findByTestId('resources-page');
  });

  it('Can navigate back to the Homepage', () => {
    //cy.visit('/academics');
    cy.findByText('Home')
      .click()
      .findByTestId('employee-dashboard-page');
  });
});
