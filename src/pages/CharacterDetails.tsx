import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { AddButton, DeleteButton } from "../components/CharacterFavButton";
import { Character } from "../models/models";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "./DetailPages.css";

const CharacterDetails: React.FC = () => {
  const { id: characterId } = useParams();
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const favCharacters = useSelector(
    (state: RootState) => state.favorites.favCharacters
  );

  const fetchCharacterById = () => {
    setIsLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((res) => res.json())
      .then((res) => {
        setCharacter(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const status = () => {
    if (character?.status === "Alive") return "--green";
    else if (character?.status === "Dead") return "--red";
  };

  useEffect(() => {
    fetchCharacterById();
  }, []);

  return (
    <>
      {character === undefined ? (
        <Loading isLoading={isLoading} />
      ) : (
        <article className="details-page">
        
            <img
              src={character?.image}
              alt={character?.name}
              className="details-page__image"
            />
            <h2 className="details-page__text details-page__text--title">
              {character?.name}
            </h2>
            {favCharacters.find((char) => char.id === character.id) ===
            undefined ? (
              <AddButton character={character} />
            ) : (
              <DeleteButton character={character} />
            )}
            <span className="details-page__text details-page__text--black">
              Status:
              <span
                className={`details-page__text details-page__text${status()}`}
              >
                {character?.status}
              </span>
            </span>
            <p className=" details-page__text ">
              <span className="details-page__text details-page__text--black">
                Gender:
              </span>
              {character?.gender}
            </p>
            <p className="details-page__text">
              <span className="details-page__text details-page__text--black">
                Specie:
              </span>
              {character?.species}
            </p>

            {/* Creating Type span only if type is not an empty string, some of the types that come from the API are empty*/}
            {character?.type !== "" ? (
              <p className="details-page__text">
                <span className="details-page__text details-page__text--black">
                  Type:
                </span>
                {character?.type}
              </p>
            ) : (
              ""
            )}

            {/* Creating Link to the origin location if it is not unknown, using substring to get the id*/}

            {character?.origin.name !== "unknown" ? (
              <p className="details-page__text">
                <span className="details-page__text details-page__text--black">
                  First apparition:
                </span>
                <Link
                  className="details-page__text details-page__text--link"
                  to={`/location/${character?.origin.url.substring(
                    41,
                    character?.origin.url.length
                  )}`}
                >
                  {character?.origin.name}
                </Link>
              </p>
            ) : (
              ""
            )}

            {/* Creating Link to the actual location of the character if it is not unknown */}

            {character?.location.name !== "unknown" ? (
              <p className="details-page__text">
                <span className="details-page__text details-page__text--black">
                  Last Seen on:
                </span>
                <Link
                  className="details-page__text details-page__text--link"
                  to={`/location/${character?.location.url.substring(
                    41,
                    character?.location.url.length
                  )}`}
                >
                  {character?.location.name}
                </Link>
              </p>
            ) : (
              ""
            )}

            <p className="details-page__text details-page__text--black">
              Episodes where <b>{character?.name}</b> appears:
            </p>

            {/* Create Link for every episode that the character is in*/}

            <div className="table-container">
              {character?.episode.map((ep) => {
                const epId: string = ep.substring(40, ep.length);
                return (
                  <Link
                    to={`/episode/${epId}`}
                    key={epId}
                    className="table-container__element"
                  >
                    {epId}
                  </Link>
                );
              })}
            </div>
       
        </article>
      )}
    </>
  );
};

export default CharacterDetails;
