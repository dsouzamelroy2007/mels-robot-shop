describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.url().should('include', '/');
  });

  it('should display site header', () => {
    cy.get('bot-site-header').should('be.visible');
  });

  it('should have router outlet', () => {
    cy.get('router-outlet').should('exist');
  });
});
