import { useState } from "react";
    
const NewTodoForm = ({ addTodo }) => {
// ***NewTodoForm***
// this component should render a form with one text input for the task to be created. When this form is submitted, a new ***Todo*** component should be created. 
    
        const INITIAL_STATE = {
          todo: ""
        };
      
        // Setting state
        const [formData, setFormData] = useState(INITIAL_STATE);
      
        // Changes in form input
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((formData) => ({
            ...formData,
            [name]: value,
          }));
        };
      
        // Submission
        const handleSubmit = (e) => {
          e.preventDefault();
          addTodo({ ...formData });
          setFormData(INITIAL_STATE);
        };
      
      //   render form
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="todo">Add todo:</label>
            <input
              id="todo"
              type="text"
              name="todo"
              placeholder="todo"
              value={formData.todo}
              onChange={handleChange}
            />
            <button>Add todo</button>
          </form>
        );
      };
    export default NewTodoForm