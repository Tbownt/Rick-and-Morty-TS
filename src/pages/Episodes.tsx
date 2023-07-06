import { useEffect, useState } from "react";
import EpisodeCard from "../components/EpisodeCard";
import Pagination from "../components/Pagination";
import { Episode } from "../models/models";


const Episodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(42);
  const [name, setName] = useState<string>("");
  const [temp, setTemp] = useState<string>("");

  const baseUrl = `https://rickandmortyapi.com/api/episode?page=${page}&name=${name}&episode=${temp}`;

  const fetchEpisodes = () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((res) => {
        setEpisodes(res.results);
        setMaxPage(res.info.pages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEpisodes();
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
          name="temp"
          onChange={(e) => {
            setTemp(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All temps</option>
          <option value="S01">Temp 1</option>
          <option value="S02">Temp 2</option>
          <option value="S03">Temp 3</option>
          <option value="S04">Temp 4</option>
          <option value="S05">Temp 5</option>
          </select>
      </div>
      <>
        {episodes === undefined ? (
          <h2 className="not-found">No Episodes found</h2>
        ) : (
          <ul className="card-container">
            {episodes?.map((episode) => (
              <EpisodeCard episode={episode} key={episode.id} />
            ))}
          </ul>
        )}
      </>
      <Pagination setPage={setPage} maxPage={maxPage} />
    </section>
  );
};

export default Episodes;
