class ProductPage {
  checkoutBtn() {
    return cy.get('.nav-link.btn.btn-primary');
  }
}

export default ProductPage;
