import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";


function DogDetails({dogs}) {
    const {name} = useParams()

    // Waiting for dogs to render 
    if (!dogs) {
        return <div>Loading...</div>;
      }

    // Going to find the dog from route params and getting needed info
    let dog = dogs.find(d => d.name.toLowerCase()===name.toLowerCase())

    return (<div>
          <h2>{dog.name}</h2>
          <p>Age: {dog.age}</p>
          <p>Facts: {dog.facts}</p>
          <img src={`/${dog.src}.jpg`} alt={dog.name} />
          <Link to={`/dogs`}>Go back</Link>
    </div>)






}

export default DogDetails