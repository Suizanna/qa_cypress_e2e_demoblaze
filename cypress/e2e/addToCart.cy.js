/// <reference types='cypress' />

import { faker } from '@faker-js/faker';

describe('demoblaze', () => {
  const user = {
    username: 'Annn',
    password: 'Maksimova111'
  };

  const testData = {
    username: faker.person.firstName() + Math.ceil(Math.random() * 1000),
    password: faker.internet.password(),
    product: 'Samsung galaxy s6'
  };

  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
  });

  it('shoud allow to login', () => {
    cy.get('[data-target="#logInModal"]').click();
    cy.get('[id="logInModalLabel"]').should('be.visible');
    cy.get('.modal-title').should('contain.text', 'Log in');
    cy.get('[id="loginusername"]').should('be.enabled');
    cy.get('[id="loginpassword"]').should('be.enabled');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('#loginusername').type(user.username);
    cy.get('#loginpassword').type(user.password);
    // eslint-disable-next-line cypress/no-force
    cy.get('[onclick="logIn()"]').click({ force: true });
    cy.get('#nameofuser').should('contain', user.username);
  });

  it('shoud allow to register', () => {
    cy.get('#signin2').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('#sign-username').type(testData.username);
    cy.get('#sign-password').type(testData.password);
    // eslint-disable-next-line cypress/no-force
    cy.get(
      // eslint-disable-next-line max-len
      '#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
    ).click({ force: true });
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Sign up successful.');
    });
  });

  it('shoud allow to add Samsung Galaxy s6 to the cart', () => {
    cy.contains('.hrefch', testData.product).click();
    cy.get('.col-sm-12 > .btn').click();

    cy.get('#cartur').click();
    cy.get('.success > :nth-child(2)').should('contain', testData.product);
  });
});
