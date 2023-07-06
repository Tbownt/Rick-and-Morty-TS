import { Link } from "react-router-dom";
import { Character } from "../models/models";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AddButton, DeleteButton } from "./CharacterFavButton";
import "./CharacterCard.css";

interface CharacterProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterProps> = ({ character }: CharacterProps) => {
  const favCharacters = useSelector(
    (state: RootState) => state.favorites.favCharacters
  );

  const status = () => {
    if (character.status === "Alive") return "card__span--green";
    else if (character.status === "Dead") return "card__span--red";
  };

  return (
    <Link to={`/character/${character.id}`} key={character.id}>
      <li className="card">
        <img className="card__img" src={character.image} alt="avatar" />

        <div className="card__text-container">
          <h4 className="card__name">{character.name}</h4>
          <p className="card__description">
            <span className={status()}>
              <b>{character.status}</b>
            </span>
          </p>
          <p className="card__description">{character.species}</p>
          <p className="card__description">{character.gender}</p>

          {/*If character is already on favorites it will render the delete Button, otherwise will render the add buttom */}

          {favCharacters.find((char) => char.id === character.id) ===undefined ?
          (
            <AddButton character={character} />
          ) : (
            <DeleteButton character={character} />
          )}
        </div>
      </li>
    </Link>
  );
};
export default CharacterCard;
