import { useEffect, useState } from "react";
import LocationCard from "../components/LocationCard";
import Pagination from "../components/Pagination";
import { Location } from "../models/models";


const Locations:React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(42);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");

  const baseUrl = `https://rickandmortyapi.com/api/location?page=${page}&name=${name}&type=${type}`;

  const fetchLocations = () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => {
        setLocations(res.results);
        setMaxPage(res.info.pages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLocations();
  }, [baseUrl]);

  return (
    <section>
      <div className="filters">
        <input
          name="name"
          type="search"
          placeholder="Search by Name"
          autoComplete="off"
          onChange={(e) => {
            setName(e.target.value);
            setPage(1);
          }}
          className="select select--input"
        />
        <select
          className="select"
          name="types"
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All types</option>
          <option value="Planet">Planet</option>
          <option value="Space station">Space station</option>
          <option value="Microverse">Microverse</option>
          <option value="Dream">Dream</option>
          <option value="Dimension">Dimension</option>
          <option value="Diegesis">Diegesis</option>
        </select>
      </div>
      <>
        {locations === undefined ? (
          <h2 className="not-found">No Locations found</h2>
        ) : (
          <ul className="card-container">
            {locations?.map((location) => (
              <LocationCard location={location} key={location.id} />
            ))}
          </ul>
        )}
      </>
      <Pagination setPage={setPage} maxPage={maxPage} />
    </section>
  );
};

export default Locations;
