import React from "react";
import { render, fireEvent} from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", function () {
  render(<BoxList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("should add new box and delete box after", function () {
  //Getting search functions from render
  const { queryByText, getByLabelText} = render(<BoxList />);

  //Geting targets
  const input = getByLabelText("Color:");
  const btn = queryByText("Add box");

  //Add green into color input and submit
  fireEvent.change(input, { target: { value: "green" } });
  fireEvent.click(btn);
  let newBox = queryByText("Here is box");
  expect(newBox).toBeInTheDocument();
//Targeting delete button and firing delete 
  const deleteBtn= queryByText("Delete")
  fireEvent.click(deleteBtn)
  expect(newBox).not.toBeInTheDocument()

});
