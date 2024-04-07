import "./App.css";
import BoxList from "./BoxList";

// ## **Testing Requirements**

// Make sure both of these apps have tests. Here are the guidelines for testing:
// - **Every component needs a smoke + snapshot test.**
// - **Critical Business Logic needs tests too**. Use your judgement for this, but make sure you cover core functionality. Examples include: the ability to enter data, submit a form, and have the desired outcome appear in the DOM.

// ## **Part 1 - Color Box Maker**

// Create a new React application, which contains the following components:

// ***App***
// this component should render the ***BoxList*** component.

// - When each ***Box*** component is displayed, add a button with the text of “X” next to each ***Box***. When this button is clicked, remove that specific box. This will require you to pass a function down as props - the button **should not** be a separate component, it should be included in the Box component.
function App() {
  return (
    <>
      <BoxList />
    </>
  );
}

export default App;
