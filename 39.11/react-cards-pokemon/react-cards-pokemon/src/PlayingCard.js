import backOfCard from "./back.png";
import "./PlayingCard.css"
import {useToggleState} from "./hooks";

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {

  const [isFacingUp, toggleFlip] = useToggleState(true);

  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={toggleFlip}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
