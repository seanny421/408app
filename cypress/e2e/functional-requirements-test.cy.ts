import { visitCaptionsPageAndClickClip, visitHomeAndAddURL, visitTermsInputAndAdd } from "./global-helpers.cy"
describe('functional requirements test', () => {
  it('the user must be able to enter YouTube URLs\n'+
    'the user must be shown a list of added URLs\n' +
    'the user must be able to remove URLs from the list', () => {
    cy.visit('http://localhost:3000/')
    const url = 'https://www.youtube.com/watch?v=jNQXAC9IVRw&ab_channel=jawed'
    cy.get('input').type(url)
    cy.get('[data-testid=submitbtn]').click()
    cy.get('a').should('have.attr', 'href', url)

    cy.get('[data-testid=remove-btn').click()
    cy.get('[data-testid=remove-btn').should('not.exist')
  })

  it('the user must be able to add words they wish to search captions for\n'+
  'the user must be able to see their list of words they wish to search for\n'+
  'the user must be able to remove words they no longer wish to search captions for', () => {
    cy.visit('http://localhost:3000/termsinput')
    const terminput = 'sample'
    cy.get('input').type(terminput)
    cy.get('[data-testid=addbtn]').click()
    cy.get('h3').contains(terminput)
    //click remove btn and check we have correctly removed it
    cy.get('.remove-term-btn').click()
    cy.get('.term-heading').should('not.exist')
  })

  it('the user must be able to add words they wish to search captions for\n'+
  'the user must be able to see their list of words they wish to search for\n'+
  'the user must be able to remove words they no longer wish to search captions for', () => {
    cy.visit('http://localhost:3000/termsinput')
    const terminput = 'sample'
    cy.get('input').type(terminput)
    cy.get('[data-testid=addbtn]').click()
    cy.get('h3').contains(terminput)
    //click remove btn and check we have correctly removed it
    cy.get('.remove-term-btn').click()
    cy.get('.term-heading').should('not.exist')
  })

  it('the user must be shown what words appear at what timestamps\n'+
  'the user can choose to add clips at the given timestamp to the download queue'+
  'the user must be able to remove the clips from the download queue', () => {
    visitHomeAndAddURL()
    const terminput = visitTermsInputAndAdd()
    cy.visit('http://localhost:3000/captions')
    cy.get('h2').contains(terminput)
    cy.get('.hover-cursor').click()
    cy.get('[data-testid=CancelIcon]').click()
    cy.get('[data-testid=CheckCircleIcon').click()
  })

  it('the user must be shown what words appear at what timestamps\n'+
  'the user can choose to add clips at the given timestamp to the download queue'+
  'the user must be able to remove the clips from the download queue', () => {
    visitHomeAndAddURL()
    const terminput = visitTermsInputAndAdd()
    visitCaptionsPageAndClickClip(terminput)
    cy.visit('http://localhost:3000/download')
    cy.get('[data-testid=CancelIcon]', {timeout: 80000})//check to see if we have downloaded clips rendered
  })
})
