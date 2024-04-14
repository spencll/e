import { Link } from "react-router-dom"

function ColorList({colors, toggleFormDisplay}) {

function handleClick(){
    toggleFormDisplay()
}

return (<div>
 {colors.map((c,i)=>(
    <div key={i}><Link to={`/colors/${c}`} onClick={handleClick}>{c}</Link></div>
    ))
    }


</div>)
}

export default ColorList