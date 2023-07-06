import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Location } from "../models/models";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Character } from "../models/models";
import CharacterCard from "../components/CharacterCard";
import { AddButton, DeleteButton } from "../components/LocationFavButton";
import planets from "../assets/images/planets.jpg";
import "./DetailPages.css";
import Loading from "../components/Loading";

const LocationDetails: React.FC = () => {
  const { id: locationId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const favLocations = useSelector(
    (state: RootState) => state.favorites.favLocations
  );

  const fetchLocationById = async () => {
    setIsLoading(true);
    const loc = await fetch(
      `https://rickandmortyapi.com/api/location/${locationId}`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    setLocation(loc);

    let data: Character[] = await Promise.all(
      loc.residents.map((x: string) => {
        return fetch(x).then((res) => res.json());
      })
    );
    setCharacters(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLocationById();
  }, []);

  return (
    <div className="details-page">
      {location === undefined ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          <article>
            <img src={planets} alt="logo" className="details-page__planets" />
            <h2 className="details-page__text details-page__text--title">
              <span className="details-page__text--black"> Location: </span>

              {location?.name}
            </h2>
            {favLocations.find((loc) => loc.id === location.id) ===
            undefined ? (
              <AddButton location={location} />
            ) : (
              <DeleteButton location={location} />
            )}

            <p className=" details-page__text ">
              <span className="details-page__text details-page__text--black">
                Type:
              </span>
              {location?.type}
            </p>
            <p className="details-page__text">
              <span className="details-page__text details-page__text--black">
                Dimension:
              </span>
              {location?.dimension}
            </p>

            {/* Checking if there are residents on the location and creating cards for them*/}
          </article>

          {location?.residents.length !== 0 ? (
            <section>
              <p className="details-page__text details-page__text--black">
                Characters that are residents on this location:
              </p>
              <br />
              {characters === undefined ? (
                <Loading isLoading={isLoading} />
              ) : (
                <div className="card-container">
                  {characters.map((char) => (
                    <CharacterCard character={char} key={char.id} />
                  ))}
                </div>
              )}
            </section>
          ) : (
            <p className="details-page__text details-page__text--black">
              There are no characters living in this location
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default LocationDetails;
