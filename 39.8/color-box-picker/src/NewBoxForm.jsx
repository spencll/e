import React, { useState } from "react";

// ***NewBoxForm***
// this component should render a form that when submitted, creates a new ***Box***. You should be able to specify the ***Box***’s width, height, and background color. When the form is submitted, clear the input values.

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = {
    width: 100,
    height: 100,
    bgColor: "",
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
    addBox({ ...formData });
    setFormData(INITIAL_STATE);
  };

//   render form
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="color">Color: </label>
      <input
        id="color"
        type="text"
        name="bgColor"
        placeholder="Box color"
        value={formData.bgColor}
        onChange={handleChange}
      />
      <label htmlFor="height">Height: {formData.height}</label>
      <input
        id="height"
        type="range"
        name="height"
        min={1}
        max={100}
        value={formData.height}
        onChange={handleChange}
      />
      <label htmlFor="width">Width: {formData.width}</label>
      <input
        id="width"
        type="range"
        name="width"
        min={1}
        max={100}
        value={formData.width}
        onChange={handleChange}
      />
      <button>Add box</button>
    </form>
  );
};

export default NewBoxForm;
