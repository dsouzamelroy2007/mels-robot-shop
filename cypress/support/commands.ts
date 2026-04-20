// Custom commands for e2e tests

Cypress.Commands.add('visitApp', () => {
  cy.visit('/');
});

declare global {
  namespace Cypress {
    interface Chainable {
      visitApp(): Chainable<void>;
    }
  }
}
