describe('Automation site tesings', () => {
  it('test other elements on this page', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');
    cy.wait(1000);

    cy.get('#alertbtn').click();
    cy.on('window:alert', str => {
      expect(str).to.equal(
        'Hello , share this practice page and share your knowledge'
      );
    });

    cy.get('[value="Confirm"]').click();
    cy.on('window:confirm', str => {
      expect(str).to.equal('Hello , Are you sure you want to confirm?');
    });
  });

  it('should open new tab', () => {
    /*
    Cypress cannot simulate testing of open a new tab in the browser.  Therefore, invoke removeAttr to remove the target attribute of the element.
    */
    cy.visit(Cypress.env('url') + '/AutomationPractice/');
    // cy.visit('http://qaclickacademy.com/practice.php');
    cy.wait(1000);

    cy.get('#opentab')
      .invoke('removeAttr', 'target')
      .click();

    cy.url().should('include', 'qaclickacademy');

    cy.wait(1000);

    // navigate to previous page
    cy.go('back');
    cy.url().should('include', '/AutomationPractice');
  });
  it('should test values inside table', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');

    // Appium (Selenium) - Mobile Automation Testing from Scratch

    // select 2nd column in each row
    cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
      const course = $el.text();
      if (course.includes('Appium (Selenium)')) {
        cy.get('tr td:nth-child(2)')
          .eq(index)
          .next()
          .then(price => {
            const priceText = price.text();
            expect(priceText).to.equal('30');
          });
      }
    });
  });
});
