describe('termsinput spec', () => {
  it('handles user input correctly', () => {
    cy.visit('http://localhost:3000/termsinput')
    const terminput = 'sample'
    cy.get('input').type(terminput)
    cy.get('[data-testid=addbtn]').click()
    cy.get('h3').contains(terminput)
  })

  it('removes terms correctly', () => {
    cy.visit('http://localhost:3000/termsinput')
    const terminput = 'sample'
    cy.get('input').type(terminput)
    cy.get('[data-testid=addbtn]').click()
    cy.get('h3').contains(terminput)
    //click remove btn and check we have correctly removed it
    cy.get('.remove-term-btn').click()
    cy.get('.term-heading').should('not.exist')
  })
})
