// ## **Part 1**
// For this assignment you will be creating three components:

// ***FirstComponent***
// renders an *h1* with the text “My very first component”.

// ***NamedComponent***
// renders a *p* that should accept a property of “name” and display text “My name is *name*”.

// ***App***
// renders a *div* with instances of the other two components.


const App = () => (
  <div>
    <FirstComponent />
    <NamedComponent />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
