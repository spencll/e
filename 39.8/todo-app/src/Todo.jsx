

function Todo({ id, todo, onDelete }) {
      // ***Todo***
  // this component should display a ***div*** with the task of the todo.
  // For each Todo component, there should also be a button with the text “X” that when clicked, removes the todo.
    const handleDelete = () => {
      onDelete(id);
    };
  
    return (
      <div>
         {todo}
        <button onClick={handleDelete}>X</button>
      </div>
    );
  }

export default Todo;
