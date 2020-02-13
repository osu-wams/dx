describe('Masquerade feature', () => {
  xit('Can reach and type into masquerade modal', () => {
    // Have to mock using the application as an administrator so that
    // the masquerade button is visible
    cy.visit('/')
      .findByTestId('masquerade')
      .click()
      .findByTestId('masquerade-dialog')
      .get('input#osu-id')
      .type('99999')
      .get('input#masquerade-reason')
      .type('testing');
  });
});
