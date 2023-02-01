import App from "./App";
import "../src/index.css";
import { inputsForm } from "./App";

const validValue = {
  cartValue: "20.23",
  deliveryDistance: "2000",
  amountItem: "10",
  result: "9",
};

const freeDeliveryvalidValue = {
  cartValue: "200",
  deliveryDistance: "2000",
  amountItem: "10",
  result: 0,
};

describe("Render testing of form in <App />", () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  it(`Check <Form/> have ${inputsForm.length} <input> field and 1 <button>`, () => {
    cy.get("form").find("input").should("have.length", inputsForm.length);
    cy.get("form").find("button").should("have.length", 1);
  });

  it(`Check <Form/> exact inputs of Cart Value ,Delivery distance, amount item and time delivery label`, () => {
    inputsForm.map((input) => {
      cy.get(".formInput").contains(input.label);
    });
  });
});

describe("Behavior testing of form in <App />", () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  it(`Error should be thrown if input is left empty`, () => {
    inputsForm.map((input) => {
      cy.get(`input[name=${input.name}]`).eq(0).click();
      cy.get(".app").click("topLeft");
      cy.get("span").contains(input.errorMessage);
    });
  });

  it(`Check delivery fee is calculated and displayed, with valid value input`, () => {
    inputsForm.map((input) => {
      if (input.name === "timeDelivery") {
        cy.get(`input[name=${input.name}]`).eq(0).type("2023-02-13T10:10");
      } else {
        const value = (validValue as any)[input.name];
        cy.get(`input[name=${input.name}]`).eq(0).type(value);
      }
    });

    cy.get("button").click();
    cy.get("p").contains(`Delivery price: ${validValue.result} €`);
  });

  it(`Check delivery fee is free, with cart Value is equal or greater 100€`, () => {
    inputsForm.map((input) => {
      if (input.name === "timeDelivery") {
        cy.get(`input[name=${input.name}]`).eq(0).type("2023-02-13T10:10");
      } else {
        const value = (freeDeliveryvalidValue as any)[input.name];
        cy.get(`input[name=${input.name}]`).eq(0).type(value);
      }
    });

    cy.get("button").click();
    cy.get("p").contains(
      "The delivery is free (0€) when the cart value is equal or more than 100€"
    );
    cy.get("p").contains(`Delivery price: ${freeDeliveryvalidValue.result} €`);
  });
});
