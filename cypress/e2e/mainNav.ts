describe('Main navigation', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Can navigate to the Academics page', () => {
      cy.get('[href="/academics"]')
        .click()
        .getByTestId('academics-page')
        .should('exist')
    })

    it('Can navigate to the Finances page', () => {
      cy.get('[href="/finances"]')
        .click()
        .getByTestId('finances-page')
        .should('exist')
    })

    it('Can navigate to the Experience page', () => {
      cy.get('[href="/experience"]')
        .click()
        .getByTestId('experience-page')
        .should('exist')
    })

    it('Can navigate to the Tools page', () => {
      cy.get('[href="/tools"]')
        .click()
        .getByTestId('tools-page')
        .should('exist')
    })

    it('Can navigate to the Homepage', () => {
      cy.getByText('Home')
        .click()
        .getByTestId('dashboard-page')
    })
  })
