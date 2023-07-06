import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CharacterCard from "../components/CharacterCard";
import LocationCard from "../components/LocationCard";
import EpisodeCard from "../components/EpisodeCard";
import "./Characters.css"


const Favorites: React.FC = () => {
  const favCharacters = useSelector(
    (state: RootState) => state.favorites.favCharacters
  );
  const favLocations = useSelector(
    (state: RootState) => state.favorites.favLocations
  );
  const favEpisodes = useSelector(
    (state: RootState) => state.favorites.favEpisodes
  );
  const [show, setShow] = useState<string>("Characters")


 //Function that will return Character/Location or Episode cards depending on what is selected 
  const GetFavorites = () => {
    if (show === "Characters") return (
      favCharacters.length === 0 ? (
        <h2 className="not-found">No favorite characters added</h2>
      ) : (
        <ul className="card-container">
          {favCharacters?.map((character) => (
            <CharacterCard character={character} key={character.id} />
          ))}
        </ul>
      )
    )
    if (show === "Locations") return (
      favLocations.length === 0 ? (
        <h2 className="not-found">No favorite locations added</h2>
      ) : (
        <ul className="card-container">
          {favLocations?.map((location) => (
            <LocationCard location={location} key={location.id} />
          ))}
        </ul>
      )
    )
    if (show === "Episodes") return (
      favEpisodes.length === 0 ? (
        <h2 className="not-found">No favorite episodes added</h2>
      ) : (
        <ul className="card-container">
          {favEpisodes?.map((episode) => (
            <EpisodeCard episode={episode} key={episode.id} />
          ))}
        </ul>
      )
    )
  }

  return (
    <section>
      <div className="filters">
        <select
          className="select"
          name="status"
          onChange={(e) => {
            setShow(e.target.value);
          }}
        >
          <option value="Characters">Characters</option>
          <option value="Locations">Locations</option>
          <option value="Episodes">Episodes</option>
        </select>
      </div>
          
          {GetFavorites()}
    </section>
  );
};

export default Favorites;
