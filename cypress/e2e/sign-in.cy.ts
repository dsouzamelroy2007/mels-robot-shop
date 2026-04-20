describe('Sign In Page', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('should load the sign-in page', () => {
    cy.url().should('include', '/sign-in');
  });

  it('should display sign-in form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('Sign In').should('be.visible');
  });

  it('should have disabled submit button when form is empty', () => {
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should enable submit button when form is filled', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });
});
