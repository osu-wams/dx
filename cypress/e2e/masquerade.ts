describe('Masquerade feature', () => {
  it('Can reach and type into masquerade modal', () => {
    cy.visit('/')
      .getByTestId('user-btn')
      .click()
      .getByText('Masquerade')
      .click()
      .getByTestId('masquerade-dialog')
      .get('input')
      .type('99999');
  });
});
