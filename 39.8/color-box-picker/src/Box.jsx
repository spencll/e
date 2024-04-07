import React from "react";

// ***Box***
// this component should display a ***div*** with a background color, width and height based on the props passed to it.

function Box({ id, bgColor, width, height, onDelete }) {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div style={{ width: width, height: height, backgroundColor: bgColor }}>
      Here is box
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Box;
