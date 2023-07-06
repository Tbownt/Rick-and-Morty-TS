import React from "react";
import { useDispatch } from "react-redux";
import { addLocation, deleteLocation,  } from "../redux/FavoritesSlice/FavoritesSlice";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Location } from "../models/models";
import "./FavButtons.css";

interface ButtonProps {
  location: Location;
}

export const AddButton:React.FC<ButtonProps> = ({ location }: ButtonProps) => {

  const dispatch = useDispatch();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addLocation(location));
  }
  
  return (
    <button className="fav-button" onClick={(e) => handleAdd(e)}>
      Add to Favorites <BsSuitHeart color="white" />
    </button>
  );
};

export const DeleteButton:React.FC<ButtonProps> = ({ location }: ButtonProps) => {
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteLocation(location));
  };

  return (
    <button className="fav-button" onClick={(e) => handleDelete(e)}>
      Remove from Favorites <BsSuitHeartFill color="#8a2323" />
    </button>
  );
};