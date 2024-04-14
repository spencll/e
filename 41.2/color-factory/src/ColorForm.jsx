import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
function ColorForm({ addColor,toggleFormDisplay}) {


    // state for color input
    const [newColor, setNewColor] = useState('');
    const navigate = useNavigate()
  
    // change newColor to input
    const handleChange = (event) => {
      setNewColor(event.target.value);
    };
  
    // Updating newColor when input changes 
    const handleSubmit = (event) => {
      event.preventDefault();
      if (newColor.trim() !== '') {
        addColor(newColor);
        setNewColor('');
        navigate("/colors")
        toggleFormDisplay()
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newColor}
          onChange={handleChange}
          placeholder="Enter color name"
        />
        <button type="submit">Add Color</button>
      </form>
    );
  }
// end

export default ColorForm
