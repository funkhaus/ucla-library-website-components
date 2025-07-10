describe("Funkhaus / Button Remove Search Filter", () => {
    it("Default", () => {
        cy.visit(
            "/iframe.html?id=search-button-remove-search-filter--default&args=&viewMode=story"
        )
        cy.get(".button-remove-search-filter").should("exist")

        cy.percySnapshot("Funkhaus / Button Remove Search Filter: Default")
    })
})
