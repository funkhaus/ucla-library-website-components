describe('Funkhaus / Block Anchor Navigation', () => {
  it('Default', () => {
    cy.visit(
      '/iframe.html?id=funkhaus-block-anchor-navigation--default&args=&viewMode=story'
    )
    cy.get('.block-anchor-nav').should('exist')
    cy.percySnapshot('Funkhaus / Block Anchor Navigation')
  })
})
