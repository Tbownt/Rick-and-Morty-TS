import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Character, Episode } from "../models/models";
import { AddButton, DeleteButton } from "../components/EpisodeFavButton";
import logo from "../assets/images/episodePageImg.png";
import Loading from "../components/Loading";
import "./DetailPages.css";
import CharacterCard from "../components/CharacterCard";

const EpisodeDetails: React.FC = () => {
  const { id: episodeId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [episode, setEpisode] = useState<Episode>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const favEpisodes = useSelector(
    (state: RootState) => state.favorites.favEpisodes
  );

  const fetchEpisodeById = async () => {
    setIsLoading(true);
    const ep = await fetch(
      `https://rickandmortyapi.com/api/episode/${episodeId}`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    setEpisode(ep);

    let data: Character[] = await Promise.all(
      ep.characters.map((x: string) => {
        return fetch(x).then((res) => res.json());
      })
    );
    setCharacters(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEpisodeById();
  }, [episodeId]);

  return (
    <div className="details-page">
      {episode === undefined ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          <article>
            <img src={logo} alt="logo" className="details-page__banner" />
            <h2 className="details-page__text details-page__text--title">
              <span className="details-page__text--black"> Title: </span>

              {episode?.name}
            </h2>
            {favEpisodes.find((ep) => ep.id === episode.id) === undefined ? (
              <AddButton episode={episode} />
            ) : (
              <DeleteButton episode={episode} />
            )}
            <p className=" details-page__text ">
              <span className="details-page__text details-page__text--black">
                Episode:
              </span>
              {episode?.episode}
            </p>
            <p className="details-page__text">
              <span className="details-page__text details-page__text--black">
                Air Date:
              </span>
              {episode?.air_date}
            </p>
          </article>
          <section>
            <p className="details-page__text details-page__text--black">
              Characters that appears on this episode:
            </p>
            <br />

            {/* Create Link for every character that appears on this episode*/}
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
        </>
      )}
    </div>
  );
};

export default EpisodeDetails;
