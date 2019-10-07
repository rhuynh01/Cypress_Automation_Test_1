describe('Automation site tesings - mouse hover', () => {
  it('testing mouse over', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');

    cy.get('div.mouse-hover-content').invoke('show');
    cy.contains('Top').click();
    cy.url().should('include', 'top');
  });
});
