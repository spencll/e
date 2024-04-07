import React from "react";
import { render, fireEvent} from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", function () {
  render(<TodoList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("should add new todo and delete todo after", function () {
  //Getting search functions from render
  const { queryByText, getByLabelText} = render(<TodoList />);

  //Geting targets
  const input = getByLabelText("Add todo:");
  const btn = queryByText("Add todo");

  //Add green into color input and submit
  fireEvent.change(input, { target: { value: "punch a wall" } });
  fireEvent.click(btn);
  let newTodo = queryByText("punch a wall");
  expect(newTodo).toBeInTheDocument();
//Targeting delete button and firing delete 
  const deleteBtn= queryByText("X")
  fireEvent.click(deleteBtn)
  expect(newTodo).not.toBeInTheDocument()

});
