describe('Automation site tesings', () => {
  it('should select option 1 checkbox checked', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');
    // verify checkbox is checked
    cy.get('#checkBoxOption1')
      .check()
      .should('be.checked')
      .and('have.value', 'option1');

    // verify checkbox is unchecked
    cy.get('#checkBoxOption1')
      .uncheck()
      .should('not.be.checked');

    // check for multiple checkboxes
    cy.get('input[type="checkbox"]').check(['option2', 'option3']);
  });
  it('should select the correct value in dropdown', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');

    //static dropdown
    cy.get('select')
      .select('option2')
      .should('have.value', 'option2');

    // dynamic dropdown --- auto-complete
    cy.get('#autocomplete').type('ind');
    cy.get('.ui-menu-item div').each(($el, index, $list) => {
      if ($el.text() === 'India') {
        $el.click();
      }
    });
    cy.get('#autocomplete').should('have.value', 'India');
  });

  it('should hide or show textbox content', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');

    // Verify if the textbox is visible or not
    cy.get('#displayed-text').should('be.visible');

    // test the hide button to hide textbox
    cy.get('#hide-textbox')
      .click()
      .get('#displayed-text')
      .should('not.be.visible');

    // test the show button to show textbox
    cy.get('#show-textbox')
      .click()
      .should('be.visible');

    // testing for radio button
    cy.get('[value="radio2"]')
      .check()
      .should('be.checked')
      .and('have.value', 'radio2');
  });
});
