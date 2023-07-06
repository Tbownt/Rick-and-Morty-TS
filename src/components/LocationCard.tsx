import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AddButton, DeleteButton } from "./LocationFavButton";
import { Location } from "../models/models";
import logo from "./../assets/images/planets.jpg";
import "./CharacterCard.css"

interface LocationProps {
  location: Location;
}

const LocationCard:React.FC<LocationProps> = ({ location }: LocationProps) => {
  const favLocations = useSelector(
    (state: RootState) => state.favorites.favLocations
  );

  return (
    <Link to={`/location/${location?.id}`} key={location?.id}>
      <li className="card card--wider">
        <img className="card__img" src={logo} alt="avatar" />

        <div className="card__text-container card__text-container--locations">
          <h4 className="card__name">{location?.name}</h4>

          <p className="card__description">{location?.type}</p>
          <p className="card__description">{location?.dimension}</p>

          {/*If location is already on favorites it will render the delete Button, otherwise will render the add buttom */}

          {favLocations.find((loc) => loc.id === location.id) ===
          undefined ? (
            <AddButton location={location} />
          ) : (
            <DeleteButton location={location} />
          )}
        </div>
      </li>
    </Link>
  );
};
export default LocationCard;
