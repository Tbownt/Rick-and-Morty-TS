import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import {Characters, Favorites, Episodes, Locations, CharacterDetails, EpisodeDetails,  LocationDetails} from "./pages";

function App():JSX.Element {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/episode/:id" element={<EpisodeDetails />} />
        <Route path="/location/:id" element={<LocationDetails />} />
        <Route path="/*" element={<Loading isLoading={false}/>} />
      </Routes>
    </>
  );
}

export default App;
