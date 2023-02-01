import { inputsForm } from "../App";
import FormInput from "./FormInput";
import "./formInput.css";

const selectedInput = inputsForm[0];

describe("Render testing of <FormInput />", () => {
  beforeEach(() => {
    cy.mount(<FormInput {...selectedInput} />);
  });

  it("Check input field for label", () => {
    cy.get("label").contains(selectedInput.label);
  });
  it("Check input field for placeholder", () => {
    cy.get("input").should(
      "have.attr",
      "placeholder",
      selectedInput.placeholder
    ); // check the placeholder in the input field
  });
});

describe("Behavior testing of <FormInput />", () => {
  beforeEach(() => {
    cy.mount(<FormInput {...selectedInput} />);
  });

  it("Check input field throw Error message if insert not valid value like text 'abc'", () => {
    cy.get("input").type("abc");
    cy.get(".formInput").click("topLeft");
    cy.get("span").contains(selectedInput.errorMessage);
  });
});
