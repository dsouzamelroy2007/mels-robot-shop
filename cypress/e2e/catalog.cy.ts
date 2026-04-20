describe('Catalog Page', () => {
  beforeEach(() => {
    cy.visit('/catalog');
  });

  it('should load the catalog page', () => {
    cy.url().should('include', '/catalog');
  });

  it('should display filter buttons', () => {
    cy.contains('Heads').should('be.visible');
    cy.contains('Arms').should('be.visible');
    cy.contains('Torsos').should('be.visible');
    cy.contains('Bases').should('be.visible');
  });

  it('should display products list', () => {
    cy.get('.products').should('be.visible');
  });
});
