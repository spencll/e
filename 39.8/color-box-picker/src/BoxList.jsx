import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import NewBoxForm from "./NewBoxForm";
import Box from "./Box";

// ***BoxList***
// Place your state that contains all of the boxes here. This component should render all of the ***Box*** components along with the ***NewBoxForm*** component

function BoxList() {
  const INITIAL_STATE = [];

  //state
  const [boxes, setBoxes] = useState(INITIAL_STATE);

  //adding box, appending new box object to array of boxes with random id for key
  const addBox = (newBox) => {
    setBoxes((boxes) => [...boxes, { ...newBox, id: uuid() }]);
  };

  const deleteBox = (id) => {
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
  };

  return (
    <div>
      <h3>Boxes</h3>
      {/* Render new form and passing function down to form*/}
      <NewBoxForm addBox={addBox} />

      {/* Extracting properties from each box object to generate new box */}
      <div>
        {boxes.map(({ id, bgColor, height, width }) => (
          <Box
            id={id}
            key={id}
            bgColor={bgColor}
            height={parseInt(height)}
            width={parseInt(width)}
            onDelete={deleteBox}
          />
        ))}
      </div>
    </div>
  );
}

export default BoxList;
