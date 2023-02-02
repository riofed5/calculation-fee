import App from "../../src/App";
import "../../src/index.css";
import { inputsForm } from "../../src/App";

const validValue = {
  cartValue: "20.23",
  deliveryDistance: "2000",
  amountItem: "10",
  timeDelivery: "2023-02-13T10:10",
  result: "7",
};

const freeDeliveryvalidValue = {
  cartValue: "200",
  deliveryDistance: "2000",
  amountItem: "10",
  timeDelivery: "2023-02-13T10:10",
  result: 0,
};

describe("Render testing of form in <App />", () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  context("check <form> render", () => {
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
});

describe("Behavior testing of form in <App />", () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  context("inputs is empty", () => {
    it(`Error should be thrown if input is left empty`, () => {
      inputsForm.map((input) => {
        cy.get(`input[name=${input.name}]`).eq(0).click();
        cy.get(".app").click("topLeft");
        cy.get("span").contains(input.errorMessage);
      });
    });
  });

  context("input cart value is invalid", () => {
    it(`if value is negative value `, () => {
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).type("-200");
      cy.get(`input[name=${inputsForm[1].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[0].errorMessage);
    });

    it(`if  value is text value `, () => {
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).type("abc");
      cy.get(`input[name=${inputsForm[1].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[0].errorMessage);
    });
  });

  context("input distance value is invalid", () => {
    it(`if value is start-with-zero value `, () => {
      cy.get(`input[name=${inputsForm[1].name}]`).eq(0).type("020");
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[1].errorMessage);
    });

    it(`if value is negative value `, () => {
      cy.get(`input[name=${inputsForm[1].name}]`).eq(0).type("-200");
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[1].errorMessage);
    });

    it(`if value is text value `, () => {
      cy.get(`input[name=${inputsForm[1].name}]`).eq(0).type("abc");
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[1].errorMessage);
    });
  });

  context("input number of item value is invalid", () => {
    it(`if value is start-with-zero value `, () => {
      cy.get(`input[name=${inputsForm[2].name}]`).eq(0).type("020");
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[2].errorMessage);
    });

    it(`if value is negative value `, () => {
      cy.get(`input[name=${inputsForm[2].name}]`).eq(0).type("-200");
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[2].errorMessage);
    });

    it(`if value is text value `, () => {
      cy.get(`input[name=${inputsForm[2].name}]`).eq(0).type("abc");
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[2].errorMessage);
    });
  });

  context("input date-time is invalid", () => {
    it(`if value is in the past`, () => {
      cy.get(`input[name=${inputsForm[3].name}]`)
        .eq(0)
        .type("2022-02-13T10:10");
      cy.get(`input[name=${inputsForm[0].name}]`).eq(0).click();
      cy.get("span").contains(inputsForm[3].errorMessage);
    });
  });

  context("delivery price is display", () => {
    it(`Check delivery fee is calculated and displayed, with valid value input`, () => {
      inputsForm.map((input) => {
        const value = (validValue as any)[input.name];
        cy.get(`input[name=${input.name}]`).eq(0).type(value);
      });

      cy.get("button").click();
      cy.get("p").contains(`Delivery price: ${validValue.result} €`);
    });

    it(`Check delivery fee is free, with cart Value is equal or greater 100€`, () => {
      inputsForm.map((input) => {
        const value = (freeDeliveryvalidValue as any)[input.name];
        cy.get(`input[name=${input.name}]`).eq(0).type(value);
      });

      cy.get("button").click();
      cy.get("p").contains(
        "The delivery is free (0€) when the cart value is equal or more than 100€"
      );
      cy.get("p").contains(
        `Delivery price: ${freeDeliveryvalidValue.result} €`
      );
    });
  });
});
