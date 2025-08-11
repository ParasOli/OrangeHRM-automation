describe('auth', () => {
    const usernameInput = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
    const passwordInput = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'
    const loginButton = '.oxd-button'
    const alertText = '.oxd-alert-content > .oxd-text'
  
    it('Valid Login', () => {
        cy.visit('/')
      cy.get(usernameInput).type('Admin')
      cy.get(passwordInput).type('admin123')
      cy.get(loginButton).click()
      cy.url().should('include', '/web/index.php/dashboard/')
      cy.screenshot('valid-login')
    })
  
    it('Invalid Login', () => {
        cy.visit('/')
      cy.get(usernameInput).type('wrongUser')
      cy.get(passwordInput).type('wrongPass')
      cy.get(loginButton).click()
      cy.get(alertText).should('contain', 'Invalid credentials')
    })

    it('Logout', () => {
        cy.visit('/')
     cy.get(usernameInput).type('Admin')
    cy.get(passwordInput).type('admin123')
        cy.get(loginButton).click()
      cy.get('.oxd-userdropdown-tab').click()
      cy.get('.oxd-dropdown-menu > :nth-child(4)').click()
      cy.url().should('include', '/web/index.php/auth/login')
      cy.screenshot('logout')
    })

  })
  