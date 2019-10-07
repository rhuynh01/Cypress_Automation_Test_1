/// <reference types="Cypress" />
describe('testing api', () => {
  it('it should display error when updating invalid comment', () => {
    cy.visit('https://example.cypress.io/commands/network-requests');
    cy.server();

    cy.route({
      method: 'PUT',
      url: 'comments/*',
      status: 404,
      response: {
        error: 'Invalid comment Id'
      },
      delay: 1000
    }).as('updateComment');

    cy.get('.network-put').click();

    cy.get('.network-put-comment').should('contain', 'Invalid comment Id');
  });
  it('', () => {
    // cy.request(method, url, body)
    cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
      name: 'My first book - Rod',
      isbn: 'isbn_num',
      aisle: 'a4',
      author: 'Rodney H'
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('Msg', 'successfully added');
    });
  });
});
