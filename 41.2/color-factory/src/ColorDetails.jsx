import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"


function ColorDetails({colors, toggleFormDisplay}) {
const {color} = useParams()

function handleClick(){
    toggleFormDisplay()
}

 // Waiting for colors to render 
 if (!colors) {
    return <div>Loading...</div>;
  }

let col = colors.find(c=>c===color)

return (<div>
    {col}
    <br></br>
    <Link to="/colors" onClick={handleClick}>Go back</Link>
</div>

)
}

export default ColorDetails