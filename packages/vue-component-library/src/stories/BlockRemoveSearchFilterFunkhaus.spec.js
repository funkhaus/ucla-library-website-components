describe("Funkhaus / Block Remove Search Filter", () => {
    it("Default", () => {
        cy.visit(
            "/iframe.html?id=funkhaus-Block-remove-search-filter--default&args=&viewMode=story"
        )
        cy.get(".Block-remove-search-filter").should("exist")

        cy.percySnapshot("Funkhaus / Block Remove Search Filter: Default")
    })
})
