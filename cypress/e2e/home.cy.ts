describe('home spec', () => {
  it('user input functions correctly', () => {
    cy.visit('http://localhost:3000/')
    const url = 'https://www.youtube.com/watch?v=jNQXAC9IVRw&ab_channel=jawed'
    cy.get('input').type(url)
    cy.get('[data-testid=submitbtn]').click()
    cy.get('a').should('have.attr', 'href', url)
  })
})
