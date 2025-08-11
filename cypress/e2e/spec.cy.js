/// <reference types="cypress" />
import 'cypress-file-upload';

describe('OrangeHRM', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123')
    cy.get('.oxd-button').click()
  })

  it('Searching for existing user', () => {
    cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').click()
    cy.get(':nth-child(2) > .oxd-input').type('Admin')
    cy.get('.oxd-form-actions > .oxd-button--secondary').click()
    cy.get('.oxd-table-row').should('contain', 'Admin')
  })

  it('Searching for non-existing user', () => {
    cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').click()
    cy.get(':nth-child(2) > .oxd-input').clear().type('non-existingUser')
    cy.get('.oxd-form-actions > .oxd-button--secondary').click()
    cy.get('.oxd-table-row').should('not.exist')
  })

  it('Adding a new user', () => {
    cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').click()
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
    cy.get('.oxd-select-option').contains('Admin').click()
    cy.get('.oxd-autocomplete-text-input > input').type('abc123')
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
    cy.get('.oxd-select-option').contains('Enable').click()
    cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type('abc123')
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123')
    cy.get('.oxd-button--secondary').click()
    cy.get('.oxd-button--secondary').click()
  })

  it('PIM', () => {
    const randomUser = `user${Math.floor(Math.random() * 100000)}`
    cy.get(':nth-child(2) > .oxd-main-menu-item').click()
    cy.get('.orangehrm-header-container > .oxd-button').click()
    cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type('paras')
    cy.get(':nth-child(2) > :nth-child(2) > .oxd-input').type('chandra')
    cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type('oli')
    cy.get('.oxd-switch-input').click()
    cy.get(':nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type(randomUser)
    cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123')
    cy.get('.oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('password123')
    cy.get('input[type="file"]').selectFile('cypress/fixtures/image.png', { force: true })

    cy.get(':nth-child(1) > .oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').invoke('val').then((value) => {
      cy.log(value)
      cy.get('.oxd-button--secondary').click()
      cy.wait(1000)
      cy.get(':nth-child(2) > .oxd-main-menu-item').click()
      cy.get(':nth-child(2) > .oxd-input').type(value)
      cy.wait(1000)
      cy.get('[type="submit"]').contains('Search').click({ force: true })

      cy.get('[data-v-6c07a142]')
        .should('contain', value)
        .closest('.oxd-table-row')
        .find('.oxd-table-cell-actions > :nth-child(1) > .oxd-icon')
        .click()

      cy.get(':nth-child(2) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type('6363')
      cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button').click()
      cy.get(':nth-child(6) > .orangehrm-tabs-item').click()
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
      cy.get('.oxd-select-option').eq(1).click()
      cy.get('.oxd-form-actions > .oxd-button').click()

      cy.get(':nth-child(2) > .oxd-main-menu-item').click()
      cy.get(':nth-child(2) > .oxd-input').type(value)
      cy.get('.oxd-form-actions > .oxd-button--secondary').click({ force: true })

      cy.get('[data-v-6c07a142]')
        .should('contain', value)
        .closest('.oxd-table-row')
        .as('row')

      cy.get('@row')
        .find('.oxd-table-cell-actions > :nth-child(2) > .oxd-icon')
        .click()

      cy.get('.oxd-button--label-danger').click()
      cy.get('.oxd-toast-content')
        .should('be.visible')
        .and('contain.text', 'Successfully Deleted')
    })
  })
})
