import {Link} from "react-router-dom"

function VendingMachine() {
    return <div>
<Link to="/chips">Chips</Link>
<br></br>
<Link to="/cookies">Cookies</Link>
<br></br>
<Link to="/soda">Soda</Link>

    </div>
}

export default VendingMachine