describe('captions match spec', () => {
  it('correctly matches captions', () => {
    //visit homepage and add youtube url to search through
    cy.visit('http://localhost:3000/')
    const url = 'https://www.youtube.com/watch?v=jNQXAC9IVRw&ab_channel=jawed'
    cy.get('input').type(url)
    cy.get('[data-testid=submitbtn]').click()
    cy.get('a').should('have.attr', 'href', url)

    //visit termsinput page and add captions we wish to search for
    cy.visit('http://localhost:3000/termsinput')
    const terminput = 'elephants'
    cy.get('input').type(terminput)
    cy.get('[data-testid=addbtn]').click()
    cy.get('h3').contains(terminput)

    cy.visit('http://localhost:3000/captions')
    cy.get('h2').contains(terminput)
  })
})
