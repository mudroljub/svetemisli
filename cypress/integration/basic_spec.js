/* global cy */

const site = {
  dev: 'localhost:3000',
  prod: 'svetemysli.github.io'
}

describe('Testira Svete misli', () => {
  it('Otvara naslovnu', () => {
    cy.visit(site.dev)
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

  it('Menja citat', () => {
    let quoteText

    cy.get('.quote-text')
      .then($quote => {
        quoteText = $quote.text()
      })

    cy.contains('Још мудрости').click()

    cy.get('.quote-text')
      .then($quote => {
        expect($quote.text()).not.to.equal(quoteText)
      })
  })

})