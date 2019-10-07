/// <reference types="Cypress" />
import ProductPage from '../../support/pageObjects/ProductPage';
import HomePage from '../../support/pageObjects/HomePage';

describe('Angularpractice testing', () => {
  before(function() {
    cy.fixture('angularpractice').then(function(data) {
      this.data = data;
    });
  });
  it.only('should fill out the form properly', function() {
    const homePage = new HomePage();
    const productPage = new ProductPage();

    cy.visit(Cypress.env('url') + '/angularpractice');

    // editbox - name
    homePage.getEditBox().type(this.data.name);

    // validate attribute minlength of the editbox
    homePage.getEditBox().should('have.attr', 'minlength', '2');

    homePage.getGender().select(this.data.gender);

    homePage.getTwoWayDataBinding().should('have.value', this.data.name);

    // validate radio button disable or not
    homePage.getEntrepreneur().should('be.disabled');

    // pause the test
    // cy.pause();

    // navigate to shop link on the page
    homePage.getShopTab().click();

    this.data.productName.forEach(product => {
      cy.selectProduct(product);
    });

    // checkout
    productPage.checkoutBtn().click();

    // validate if the sum amount in the shopping cart
    let sum = 0;
    cy.get('tr td:nth-child(4) strong')
      .each(($el, index, $list) => {
        sum = Number(sum) + Number($el.text().split(' ')[1]);
      })
      .then(() => {
        cy.log(`total value of sum: ${sum}`);

        cy.get('h3 > strong').then(element => {
          const amount = Number(
            element
              .text()
              .split(' ')[1]
              .trim()
          );
          expect(amount).to.equal(sum);
        });
      });

    // cy.pause();
    // Cypress.config('pageLoadTimeout', 20000);

    cy.contains('Checkout').click();
    cy.get('#country').type('India');
    cy.get('.suggestions > ul > li > a').click();
    cy.get('#checkbox2').click({ force: true });
    cy.get('input[type="submit"]').click();
    cy.get('.alert').should(
      'have.text',
      'Success! Thank you! Your order will be delivered in next few weeks :-).'
    );

    cy.get('.alert').then(element => {
      const actualText = element.text();
      expect(actualText.includes('Success!')).to.be.true;
    });
  });
});
