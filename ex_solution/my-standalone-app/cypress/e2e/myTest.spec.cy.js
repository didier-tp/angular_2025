//NB: il faut préalablement lancer ng-serve ou autre
describe('My Angular Tests', () => {
    it('good conversion', () => {
    //partir de index.html
    cy.visit("http://localhost:4200/index.html")
    //cliquer sur le lien comportant 'basic'
    cy.contains('basic').click()
    cy.wait(50)
    // Should be on a new URL which includes 'basic'
    cy.url().should('include', 'basic')
    cy.get('a[href="/ngr-basic/calculatrice/simple"]').click()

    //cette version (simple) du test convient à une version de basic.component.html
    //qui ne comporte pas de calculatrice en double (par exemple dans onglet ou dans toggle-panel)

    // Get an input, type data into it
    //and verify that the value has been updated
    cy.get('input[name="a"]')
    .clear()
    .type('9')
    .should('have.value', '9')
    cy.get('input[name="b"]')
    .clear()
    .type('6')
    .should('have.value', '6')
    //declencher click sur bouton soustraction
    //cy.get('input[type="button"][value="-"]')
    cy.get('button:contains("-")')
    .click()
    //vérifier que la zone d'id spanRes comporte le texte '3'
    cy.get('#spanRes')
    .should('have.text', '3')
    })
    })