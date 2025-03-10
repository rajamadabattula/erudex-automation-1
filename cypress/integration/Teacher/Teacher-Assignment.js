/// <reference types="Cypress" />

import Assignment from "../../support/pageObjects/Assignment";
const AssignmentPage = new Assignment();

const cred = require("../../fixtures/Credentials.json");
const assessmentPage = require("../../fixtures/Assignment.json");
describe("Teacher Assignment", () => {
  it("Signin", () => {
    cy.Signin(cred.TeacherUserName, cred.TeacherPassword);
  });
  it("Create Assignment", function () {
    cy.Curriculum();
    AssignmentPage.getCreateAssignment().click({ force: true });
    AssignmentPage.getName().type(assessmentPage.name);
    AssignmentPage.getClass().contains(assessmentPage.Class);
    AssignmentPage.getSubject().contains(assessmentPage.Subject);
    AssignmentPage.getChapter().contains(assessmentPage.Chapter);
    cy.wait(2000);
    AssignmentPage.getSubjectTopics()
      .contains(assessmentPage.Topic)
      .click({ force: true });
    cy.wait(2000);
    AssignmentPage.getSubjectTopics()
      .contains(assessmentPage.SubTopic)
      .click({ force: true });
    AssignmentPage.getMarks().contains(assessmentPage.Marks);
    AssignmentPage.getDescription().type(assessmentPage.Description);
    AssignmentPage.getCreateAssignPush().click({ force: true });
    AssignmentPage.getCheckbox().check().should("be.checked");
    AssignmentPage.getStartCalender().click();
    AssignmentPage.getActiveDate(assessmentPage.pushDate1).click();
    AssignmentPage.getCalenderHour(assessmentPage.pushHour1).click();
    AssignmentPage.getCalenderMinute(assessmentPage.pushMin1).click();
    AssignmentPage.getEndCalender().click();
    AssignmentPage.getActiveDate(assessmentPage.pushDate2).click();
    AssignmentPage.getCalenderHour(assessmentPage.pushHour2).click();
    AssignmentPage.getCalenderMinute(assessmentPage.pushMin2).click();
    AssignmentPage.getCancel().click();
  });
  it("View Assignment", function () {
    AssignmentPage.getViewAssignment().click({ force: true });
    AssignmentPage.getClass().contains(assessmentPage.Class);
    AssignmentPage.getSubject().contains(assessmentPage.Subject);
    AssignmentPage.getChapter().contains(assessmentPage.Chapter);
    AssignmentPage.getSelectDate().contains(assessmentPage.CreatedDate);
    AssignmentPage.getCalender1().click();
    AssignmentPage.getDate().contains(assessmentPage.Date1).click();
    AssignmentPage.getCalender2().click();
    AssignmentPage.getDate().contains(assessmentPage.Date2).click();
    AssignmentPage.getPushedButton().click();
    AssignmentPage.getAssignmentPushedTable().each(($e1, index, $list) => {
      const text = $e1.text();
      if (text.includes("Physics")) {
        $e1.click();
      }
    });
    AssignmentPage.getBack().click();
    //cy.Logout()
  });
  it("Log out", () => {
    cy.Logout();
  });
});
