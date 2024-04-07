import React from "react";
import { render } from "@testing-library/react";
import App from "./App.jsx";


test("App renders", () => {
  render(<App />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});