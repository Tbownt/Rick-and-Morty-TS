import React from "react";
import { useDispatch } from "react-redux";
import { addCharacter,  deleteCharacter} from "../redux/FavoritesSlice/FavoritesSlice";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { Character } from "../models/models";
import "./FavButtons.css";

interface ButtonProps {
  character: Character;
}

export const AddButton: React.FC<ButtonProps> = ({ character }: ButtonProps) => {

  const dispatch = useDispatch();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addCharacter(character));
  }
  
  return (
    <button className="fav-button" onClick={(e) => handleAdd(e)}>
      Add to Favorites <BsSuitHeart color="white" />
    </button>
  );
};

export const DeleteButton:React.FC<ButtonProps> = ({ character }: ButtonProps) => {
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteCharacter(character));
  };

  return (
    <button className="fav-button" onClick={(e) => handleDelete(e)}>
      Remove from Favorites <BsSuitHeartFill color="#8a2323" />
    </button>
  );
};
