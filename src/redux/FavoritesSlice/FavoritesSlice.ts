import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, Location, Episode } from "../../models/models";

export interface FavoritesState {
  favCharacters: Character[];
  favLocations: Location[];
  favEpisodes: Episode[];
}

//getting first state from local storage
const favCharacters = JSON.parse(
  localStorage.getItem("favCharacters") ?? "[]"
) as Character[];

const favLocations = JSON.parse(
  localStorage.getItem("favLocations") ?? "[]"
) as Location[];

const favEpisodes = JSON.parse(
  localStorage.getItem("favEpisodes") ?? "[]"
) as Episode[];

const initialState: FavoritesState = {
  favCharacters,
  favLocations,
  favEpisodes,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      // Redux toolkit makes all mutations into immutable operations, therefore, i can use a .push, spread operator is the other option
      state.favCharacters.push(action.payload);

      //adding the new array to localstorage
      localStorage.setItem(
        "favCharacters",
        JSON.stringify(state.favCharacters)
      );
    },

    deleteCharacter: (state, action: PayloadAction<Character>) => {
      //adding to the state only those characthers that dont have the same id that the one that is being removed
      state.favCharacters = state.favCharacters.filter(
        (char) => char.id !== action.payload.id
      );
      //adding the new Characters array to localstorage
      localStorage.setItem(
        "favCharacters",
        JSON.stringify(state.favCharacters)
      );
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.favLocations.push(action.payload);
      localStorage.setItem("favLocations", JSON.stringify(state.favLocations));
    },

    deleteLocation: (state, action: PayloadAction<Location>) => {
      state.favLocations = state.favLocations.filter(
        (loc) => loc.id !== action.payload.id
      );
      localStorage.setItem("favLocations", JSON.stringify(state.favLocations));
    },
    addEpisode: (state, action: PayloadAction<Episode>) => {
      state.favEpisodes.push(action.payload);
      localStorage.setItem("favEpisodes", JSON.stringify(state.favEpisodes));
    },

    deleteEpisode: (state, action: PayloadAction<Episode>) => {
      state.favEpisodes = state.favEpisodes.filter(
        (char) => char.id !== action.payload.id
      );
      localStorage.setItem("favEpisodes", JSON.stringify(state.favEpisodes));
    },
  },
});

export const {
  addCharacter,
  deleteCharacter,
  addEpisode,
  deleteEpisode,
  addLocation,
  deleteLocation,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
