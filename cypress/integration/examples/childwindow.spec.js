describe('Automation site tesings - child window', () => {
  it('testing open child window', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');
    cy.get('#opentab').then(el => {
      const url = el.prop('href');
      cy.log(url);
      // navigate to the new link
      // cannot visit url for multiple domain
      // cy.visit(url);
    });
  });
});
