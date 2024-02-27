import axios from "axios";
import { useEffect, useState } from "react";
import "../styles.css";
import Ships from "../Ships/Ships";
("../Ships/Ships");

export const Movies = () => {
  // state to store the fetched data
  const [movies, setMovies] = useState([]);
  // control the visibility of details
  const [movieDetailsId, setMovieDetailsId] = useState(null);
  // control visibilty of ships
  const [showShips, setShowShips] = useState(false);
  // store urls of ships of each movie
  const [shipsUrls, setShipsUrls] = useState([]);

  const baseUrl = "https://swapi.constructor-learning.com/api/films/";
  // use async function to fetch
  const fetchMovies = async () => {
    try {
      // use try in order to use catch
      //get req to the api endpoint
      const response = await axios.get(baseUrl);
      //update the state with the fetched data
      setMovies(response.data.results);
      //   console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to fetch only once: after the comp Movies is rendered(mounted)
  useEffect(() => {
    fetchMovies();
  }, []);
  // if the movie's details are already displayed, clicking the title should hide them again
  function handleMovieDetails(movieDetailsId) {
    setMovieDetailsId((prev) =>
      prev === movieDetailsId ? null : movieDetailsId
    );
  }
  function handleShowShips(urls) {
    // console.log(urls);
    setShowShips((prev) => !prev);
    setShipsUrls(urls);
  }

  return (
    <main className="container">
      <div className="moviesCol">
        {movies.map((movie) => (
          // console.log(movie)
          <div className="movie-card" key={movie.episode_id}>
            <div onClick={() => handleMovieDetails(movie.episode_id)}>
              <h3>{movie.title}</h3>
              {/* can create a seperate comp : MovieDetails */}
              {movieDetailsId === movie.episode_id && (
                <div className="movie-details">
                  <div>
                    <strong>Opening Crawl: </strong>
                    {movie.opening_crawl}
                  </div>
                  <div>
                    <strong>Episode ID: </strong>
                    {movie.episode_id}
                  </div>
                  <div>
                    <strong>Release Date: </strong>
                    {movie.release_date}
                  </div>
                </div>
              )}
            </div>
            <button
              className="show-ships-btn"
              onClick={() => handleShowShips(movie.starships)}
            >
              SHOW STARSHIPS
            </button>
          </div>
        ))}
      </div>
      <div>{showShips && <Ships shipsUrls={shipsUrls} />}</div>
    </main>
  );
};
