const Person = (props) => {
  let reply;
  let name;
  props.age > 18 ? (reply = "Please go vote") : (reply = "You must be 18");

  props.name.length > 8
    ? (name = props.name.substring(0, 6))
    : (name = props.name);
  return (
    <div>
      <p>
        Learn some information about this person
        <h3>{reply}</h3>
        <h4>{name}</h4>
        <ul>
          {props.hobbies.map((h) => (
            <li>{h}</li>
          ))}
        </ul>
      </p>
    </div>
  );
};
