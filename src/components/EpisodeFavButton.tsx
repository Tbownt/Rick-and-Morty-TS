import React from "react";
import { useDispatch } from "react-redux";
import { addEpisode, deleteEpisode,  } from "../redux/FavoritesSlice/FavoritesSlice";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Episode } from "../models/models";
import "./FavButtons.css";

interface ButtonProps {
  episode:Episode
}

export const AddButton:React.FC<ButtonProps> = ({ episode }: ButtonProps) => {

  const dispatch = useDispatch();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addEpisode(episode));
  }
  
  return (
    <button className="fav-button" onClick={(e) => handleAdd(e)}>
      Add to Favorites <BsSuitHeart color="white" />
    </button>
  );
};

export const DeleteButton:React.FC<ButtonProps> = ({ episode }: ButtonProps) => {
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteEpisode(episode));
  };

  return (
    <button className="fav-button" onClick={(e) => handleDelete(e)}>
      Remove from Favorites <BsSuitHeartFill color="#8a2323" />
    </button>
  );
};