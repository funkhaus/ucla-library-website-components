describe("Funkhaus / BlockTag", () => {
    it("Default", () => {
        cy.visit(
            "/iframe.html?id=block-tag-funkhaus--default&args=&viewMode=story"
        )
        cy.get(".block-tag-funkhaus").should("exist")
        cy.percySnapshot("Funkhaus / BlockTag")
    })
})
