describe('SeleniumPractise - shopping cart', () => {
  it('should add item to shopping cart', () => {
    cy.visit(Cypress.env('url') + '/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);
    cy.get('.products')
      .find('.product')
      .each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          $el.find('button').click();
        }
      });

    cy.get('.cart-icon').click();
    cy.contains('PROCEED TO CHECKOUT').click();
    cy.contains('Place Order').click();
  });
});
