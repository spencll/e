import { render, fireEvent } from "@testing-library/react";
import Card from "./Card.js";

// Smoke test
it("renders without crashing", function () {
  render(<Card />);
});

// Snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Card/>);
    expect(asFragment()).toMatchSnapshot();
  });

