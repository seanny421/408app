//helper functions to reduce re-used code
export function visitHomeAndAddURL(){
  cy.visit('http://localhost:3000/')
  const url = 'https://www.youtube.com/watch?v=Mc4t66r54dU&ab_channel=GoodMythicalMorning'
  cy.get('input').type(url)
  cy.get('[data-testid=submitbtn]').click()
  cy.get('a').should('have.attr', 'href', url)
}

export function visitTermsInputAndAdd(){
  cy.visit('http://localhost:3000/termsinput')
  const terminput = 'homeschoolers'
  cy.get('input').type(terminput)
  cy.get('[data-testid=addbtn]').click({multiple: false})
  cy.get('h3').contains(terminput)
  return terminput
}

export function visitCaptionsPageAndClickClip(terminput:string){
    cy.visit('http://localhost:3000/captions')
    cy.get('h2').contains(terminput)
    cy.get('.hover-cursor').click()
    cy.get('[data-testid=CancelIcon]').click()
}