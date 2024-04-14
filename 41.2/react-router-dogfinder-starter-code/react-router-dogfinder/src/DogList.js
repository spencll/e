import { Link } from "react-router-dom";

function DogList({dogs}) {

// Waiting for dogs to render
    if (!dogs) {
        return <div>Loading...</div>;
      }

    return (
    <div>
      {dogs.map((dog, index) => (
        <div key={index}>
          <h2>{dog.name}</h2>
          <p>Age: {dog.age}</p>
          <p>Facts: {dog.facts}</p>
          <img src={`/${dog.src}.jpg`} alt={dog.name} />
          <Link to={`/dogs/${dog.name}`}>Specific details</Link>
        </div>
      ))}
    </div>
    )

}

export default DogList