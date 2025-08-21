describe('Funkhaus / Block Anchor Nav', () => {
  it('Default', () => {
    cy.visit(
      '/iframe.html?id=funkhaus-block-anchor-nav-default&args=&viewMode=story'
    )
    cy.get('.block-anchor-nav').should('exist')

    cy.percySnapshot('Funkhaus / Block Anchor Nav: Default')
  })
})
