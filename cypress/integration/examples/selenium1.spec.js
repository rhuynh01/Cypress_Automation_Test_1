/// <reference types="Cypress" />
describe('SeleniumPractise', () => {
  it('my first test cases in landing page', () => {
    cy.visit(Cypress.env('url') + '/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');

    cy.get('.products')
      .find('.product')
      .should('have.length', 4);

    cy.get('.products')
      .find('.product')
      .eq(1)
      .contains('ADD TO CART')
      .click();

    cy.get('.products')
      .find('.product')
      .each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          $el.find('button').click();
        }
      });

    cy.get('.brand').should('have.text', 'GREENKART');
    cy.get('.greenLogo').then(brandElement => {
      cy.log(brandElement.text());
    });
  }); //first test case
});
