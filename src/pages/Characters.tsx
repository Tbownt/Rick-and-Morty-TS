import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import { Character } from "../models/models";

const Characters:React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(42);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [species, setSpecie] = useState<string>("");
  const baseUrl = `https://rickandmortyapi.com/api/character?page=${page}&name=${name}&status=${status}&gender=${gender}&species=${species}`;

  const fetchCharacters = () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => {
        setCharacters(res.results);
        setMaxPage(res.info.pages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCharacters();
  }, [baseUrl]);

  return (
    <section>
      <div className="filters">
        <input
          name="name"
          type="text"
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
          name="status"
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All statuses</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          className="select"
          name="gender"
          onChange={(e) => {
            setGender(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          className="select"
          name="specie"
          onChange={(e) => {
            setSpecie(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Species</option>
          <option value="Animal">Animal</option>
          <option value="Alien">Alien</option>
          <option value="Cronenberg">Cronenberg</option>
          <option value="Desease">Desease</option>
          <option value="Human">Human</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Mythological Creature">Mythological Creature</option>
          <option value="Robot">Robot</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <>
        {characters === undefined ? (
          <h2 className="not-found">No Characters found</h2>
        ) : (
          <ul className="card-container">
            {characters?.map((character) => (
              <CharacterCard character={character} key={character.id} />
            ))}
          </ul>
        )}
      </>
      <Pagination setPage={setPage} maxPage={maxPage} />
    </section>
  );
};

export default Characters;
