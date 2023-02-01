import { useState } from "react";
import FormInput from "./components/FormInput";
import { calculateDevliveryFee } from "./solution";

export const inputsForm = [
  {
    id: 1,
    name: "cartValue",
    type: "text",
    placeholder: "Ex: 20.35",
    errorMessage: "Cart Value accepts float number value",
    label: "Cart Value",
    pattern: "^(([0-9]*)|(([0-9]*).([0-9]*)))$",
    required: true,
  },
  {
    id: 2,
    name: "deliveryDistance",
    type: "text",
    placeholder: "Ex: 2000",
    errorMessage:
      "Delivery Distance accepts integer number value. Don't start with zero",
    label: "Delivery Distance in (m)",
    pattern: "^([1-9][0-9]*)$",
    required: true,
  },
  {
    id: 3,
    name: "amountItem",
    type: "text",
    placeholder: "Ex: 5",
    errorMessage:
      "Amount Item accepts integer number value. Don't start with zero",
    label: "Amount Item",
    pattern: "^([1-9][0-9]*)$",
    required: true,
  },
  {
    id: 4,
    name: "timeDelivery",
    type: "datetime-local",
    placeholder: "Time Delivery",
    label: "Time Delivery",
    errorMessage: "Time Delivery can not be in the past",
    required: true,
    min: `${new Date().toISOString()}`,
  },
];

function App() {
  const [values, setValues] = useState({
    cartValue: "",
    deliveryDistance: "",
    amountItem: "",
    timeDelivery: "",
  });

  const [deliveryPrice, setDeliveryPrice] = useState({
    message: "",
    value: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateDevliveryFee(
      +values.cartValue,
      +values.amountItem,
      +values.deliveryDistance,
      new Date(values.timeDelivery).getTime()
    );

    setDeliveryPrice(result);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Delivery Fee Calculator</h1>
        {inputsForm.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={(values as any)[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Calculate delivery price</button>
        {deliveryPrice.value !== "" && (
          <>
            {deliveryPrice.message && <p>{deliveryPrice.message}</p>}
            <p>Delivery price: {deliveryPrice.value} €</p>
          </>
        )}
      </form>
    </div>
  );
}

export default App;
