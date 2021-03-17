/// <reference types="Cypress" />
import Grade from '../../support/pageObjects/Grade'
import 'cypress-wait-until';
const grade = new Grade()
const grading = require('../../fixtures/Grading.json')
describe('My First Test Suite', function() 
{
    it('Signin', ()=>{
        cy.Signin(grading.TeacherUserName,
                  grading.TeacherPassword);
        cy.get('.success').click()
      });
    it('Reach-Grade', ()=>{
        cy.intercept({
            pathname: "/ErudexWebService/rest/live-class/getMeetings"
        }).as('LC-Data')
        cy.intercept({
            pathname: "/user/getUserCurriculum"
        }).as('Curr-Data')
        cy.intercept({
            pathname: "/userActivity/addPageActivity"
        }).as('PageActivityData')

        //cy.waitForResourceToLoad()
        cy.get(".dash-blk > .icon-live-classes").click({force:true});
        cy.wait('@LC-Data').should('not.have.property', 'duration')
        
        cy.get(".nice-select").find("ul.list > li").contains('CBSE-Class 12').click({force:true});
        //cy.waitUntil(() => cy.window());

        cy.get('ul li.option').contains('Apr 2021').click({force:true})
        cy.wait('@PageActivityData').should('not.have.property', 'duration')

        cy.get('.date-selector').contains('08 - 14').should('contain.text','08 - 14').click({force:true})
        cy.wait('@LC-Data').its('response.statusCode').should('eq', 200)

        cy.get('.date-selector').contains('15 - 21').should('contain.text','15 - 21').click({force:true})
        cy.wait('@LC-Data').its('response.statusCode').should('eq', 200)

        cy.get('.date-selector').contains('22 - 28').should('contain.text','22 - 28').click({force:true})
        cy.wait('@LC-Data').its('response.statusCode').should('eq', 200)
        
        cy.get('[ui-sref="liveClasses.create"]').click();

        /*
        cy.get('select').eq(1).select('0').contains('Cbse-English')
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.get('select').eq(2).select('1').contains('Class 12')
        cy.wait('@PageActivityData').then((req)=>{
         expect(req.response.statusCode).to.eq(200)
        })
        cy.get('select').eq(3).select('3').contains('Physics')
        */
    })
    //it('Logout', ()=>{
    //    cy.Logout()
    //})    
})
    