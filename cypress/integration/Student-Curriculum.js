/*
Authors: Rishi, Harsha
To-Do: Similar code structre as others using pageobjects and fixture data
*/

import IndexPage from '../support/pageObjects/IndexPage'
import CurriculumPage from '../support/pageObjects/CurriculumPage'

const CREDENTIALS = require('../fixtures/Credentials.json')
const CURRICULUM_DATA = require('../fixtures/Curriculum-Data.json')
const IndexPage = new IndexPage();
const CurriculumPage = new CurriculumPage();

//const curriculumData = require('../../fixtures/organized/Curriculum-Data')

describe('My First test', () => {
    it('Login', ()=>{
      cy.Signin(CREDENTIALS.teacher.Username,
                CREDENTIALS.teacher.Password);
    });
    it('TC1,2 Curriculum Pre-Steps', () => {
        IndexPage.getCurriculum()
                 .click()
        cy.wait(2000)
        CurriculumPage.getSubject()
                      .contains(CURRICULUM_DATA.subject)
                      .click()
        cy.get(".expand-arrow")
          .click()
        cy.get(".fa.fa-arrow-circle-left")
          .click()
        cy.get('.nice-select').first().click({force:true})
        cy.get('ul.list > li').contains(CURRICULUM_DATA.class).click({force:true})
    });
    it('TC3,4,6 View the features and topic  videos of a selected chapter',() => {
        cy.get('li>div.resource-img-wrapper')
          .eq(0)
          .click({force:true})
        cy.get(".collab-collapse",{ timeout: 10000 })
          .click()
        cy.get(".fa.fa-chevron-left")
          .eq(1)
          .click()
        cy.wait(10000)
        cy.get(".iconButton.pause")
          .click()
        cy.get(".accordion")
          .contains("Chapter Content")
          .click()
        cy.get(".related-resource")
          .eq(4)
          .click()
        cy.get('vg-play-pause-button.ng-scope > .iconButton')
          .click()

        //Checking Chapter Features
        cy.get('[resources="selectedChapter.chapterResources"] >')
          .each(($el, idx, $list)=>{
            cy.contains("Chapter Features")
              .click()
            cy.wait(2000)
            let child = `[resources="selectedChapter.chapterResources"] > [index="${idx}"]`;
            cy.get(child)
              .trigger('click')
            cy.wait(2000)
          })
        cy.wait(10000)
    });
    it('TC8 Giving rating to a chapter Feature', ()=> {
      cy.get('[ng-if="show.chapterFeatures"] > .ng-binding')
        .click()
      cy.get('[resources="selectedChapter.chapterResources"] >')
        .eq(0)
        .click()
      cy.wait(5000)
      cy.get('[ng-click="toggleRatingBar()"] > img')
        .click()
      cy.get('[ng-class="{active:currentResourceRating > 4.75}"]')
        .click()
        .should('have.class','noselect active')
      cy.get('[ng-class="{active:currentResourceRating > 0.75}"]')
        .click()
      cy.get('[ng-class="{active:currentResourceRating > 4.75}"]')
        .should('not.have.class','noselect active')
      cy.get('[ng-click="toggleRatingBar()"] > img')
        .click()
    });
    it('TC12 Like a Chapter Feature', ()=> {
      cy.get('[ng-click="toggleFavorite()"] > .ng-scope')
        .click()
    });
    it('TC11 Giving rating to a Animation(Video)', ()=> {
      cy.get('a.ng-binding > .ng-binding')
        .click()
      cy.get('[resources="selectedChapter.animationResources"] >')
        .eq(0)
        .click()
      cy.wait(5000)
      cy.get('[ng-click="toggleRatingBar()"] > img')
        .click()
      cy.get('[ng-class="{active:currentResourceRating > 4.75}"]')
        .click()
        .should('have.class','noselect active')
      cy.get('[ng-class="{active:currentResourceRating > 0.75}"]')
        .click()
      cy.get('[ng-class="{active:currentResourceRating > 4.75}"]')
        .should('not.have.class','noselect active')
      cy.get('[ng-click="toggleRatingBar()"] > img')
        .click()
    })
    it('TC15 Like an Animation(Video)', ()=> {
      cy.get('[ng-click="toggleFavorite()"] > .ng-scope')
        .click()
    });
    it('TC21 Create a New Note confirmation = Save', () => {
      let time = new Date().toLocaleString()
      cy.wait(5000)
      cy.contains('New Note')
          .click()
      cy.get('#newNoteText')
          .type(time)
      cy.contains('Save')
          .click()
      cy.wait(1000)
      cy.get('.note-text').then(function(text) {
        var note = text.text()
        expect(note).to.contain(time)
      })
  })
  it('TC20 Create a New Note confirmation = Cancel', () => {
    let time = new Date().toLocaleString()
    cy.wait(5000)
    cy.contains('New Note')
        .click()
    cy.get('#newNoteText')
        .type(time)
    cy.contains('Cancel')
        .click()
    cy.wait(1000)
    cy.get('.note-text').then(function(text) {
      var note = text.text()
      expect(note).to.not.contain(time)
    })
  })
  it('Hide Notes', ()=> {
    cy.get('.ng-binding.active > span.ng-scope')
      .click()
    cy.get('.note-text').should('not.be.visible')
  })
  it('TC28 Zoom in/Zoom out the chapter text book', ()=> {
    cy.get('[ng-if="show.chapterFeatures"] > .ng-binding')
      .click()
    cy.get('[resources="selectedChapter.chapterResources"] >')
      .eq(0)
      .click()
    cy.wait(15000)
    cy.get('[ng-click="pdfViewer.zoomIn()"]')
      .click()
    cy.get('canvas.pdf-canvas')
      .invoke('attr','width')
      .should('not.equal', '800') //800 is hardcoded here because i couldn't figure out how to get the value from the element
    cy.get('[ng-click="pdfViewer.zoomOut()"]')
      .click()
    cy.get('canvas.pdf-canvas')
      .invoke('attr','width')
      .should('equal', '800') 
  })
  // it('TC28 View the next/previous pages in the text book', ()=> { //UNFINISHED, no clue how to get the current page nunmber
  //   cy.get('div.e-button.radius')
  //     .eq(1)
  //     .click()
  //   cy.get('div.no-select.pdf-nav > input')
  //     .then($input => {
  //       expect($input).to.contain('2')
  //     })
  // })
  it('TC31 Expand/Collapse a video', ()=> {

  })
  it('Log User Out', ()=>{
      cy.wait(2000)
      cy.get('[ng-click="logout()"]')
      //cy.get(' i.fa.fa-power-off')
        .click({force: true})
  });
});


/*
import AssignmentPage from "../../support/pageObjects/AssignmentsPage";
import IndexPage from "../../support/pageObjects/IndexPage";
import Signin from "../../support/pageObjects/Signin";

describe("testing", () => {
  beforeEach(function () {
    cy.fixture("StudentDataAssignment").then(function (data) {
      this.data = data;
    });
  });
  it("signin", function () {
    const signin = new Signin();
    cy.visit(Cypress.env("url"));
    signin.getUsername().first().should("be.visible").type(this.data.username);
    signin.getPassword().first().type(this.data.password);
    signin.getSubmit().first().click();
    signin.getPopup().contains("Yes").should("be.visible").click();
  });
  it("Curriculum Pre-Steps", () => {
    cy.get("span.icon-curriculum").click();
    cy.wait(2000);
    cy.get(".subject-button").contains("Mathematics").click();
    cy.get(".expand-arrow").click();
    cy.get(".fa.fa-arrow-circle-left").click();
    cy.get(".nice-select.curriculum-grade-dropdown")
      .click()
      .contains("CBSE-Class 12")
      .click();
  });
  it("Displaying Curriculum", () => {
    cy.get("li>div.resource-img-wrapper").eq(0).click({ force: true });
    cy.get(".collab-collapse", { timeout: 10000 }).click();
    cy.get(".fa.fa-chevron-left").eq(1).click();
    cy.wait(10000);
    cy.get(".iconButton.pause").click();
    cy.get(".accordion").contains("Chapter Content").click();
    cy.get(".related-resource").eq(4).click();
    cy.get("vg-play-pause-button.ng-scope > .iconButton").click();

    //Checking Chapter Features
    cy.get('[resources="selectedChapter.chapterResources"] >').each(
      ($el, idx, $list) => {
        cy.contains("Chapter Features").click();
        cy.wait(2000);
        let child = `[resources="selectedChapter.chapterResources"] > [index="${idx}"]`;
        cy.get(child).trigger("click");
        cy.wait(2000);
      }
    );
    cy.wait(10000);
  });
});

*/