import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AddButton, DeleteButton } from "./EpisodeFavButton";
import { Episode } from "../models/models";
import logo from "./../assets/images/episodePageImg.png";
import "./CharacterCard.css";

interface EpisodeProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeProps> = ({ episode }: EpisodeProps) => {
  const favEpisodes = useSelector(
    (state: RootState) => state.favorites.favEpisodes
  );

  return (
    <Link to={`/episode/${episode?.id}`} key={episode?.id}>
      <li className="card card--wider">
        <img className="card__img" src={logo} alt="avatar" />

        <div className="card__text-container card__text-container--locations">
          <h4 className="card__name">{episode?.name}</h4>

         <p className="card__description">{episode?.air_date}</p>
         <b><p className="card__description">{episode.episode}</p></b>

          {/*If character is already on favorites it will render the delete Button, otherwise will render the add buttom */}

          {favEpisodes.find((ep) => ep.id === episode.id) === undefined ? (
            <AddButton episode={episode} />
          ) : (
            <DeleteButton episode={episode} />
          )}
        </div>
      </li>
    </Link>
  );
};
export default EpisodeCard;
