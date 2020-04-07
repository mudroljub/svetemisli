/* global cy */

// localhost:3000
// svetemysli.github.io

describe('Testira Svete misli', () => {
  it('Otvara naslovnu', () => {
    cy.visit('localhost:3000')
  })

  it('Provarava navigaciju', () => {
    cy
      .get('nav')
      .should('be.visible')
  })

  it('Provarava stranice', () => {
    cy.contains('Пријава').click()
    cy.url().should('include', '/prijava')

    cy.contains('Сви цитати').click()
    cy.url().should('include', '/citati')

    cy.contains('Мудрост дана').click()
    cy.url().should('include', '/')
  })

  it('Provarava citat', () => {
    cy.get('blockquote')
      .should('be.visible')
      .should('not.be.empty')
  })

})