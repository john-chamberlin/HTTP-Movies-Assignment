import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory()
  const {id} = useParams()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res=> {
        getMovieList()
        console.log(res)
        push('/')
      })
      .catch(err=> {
        console.log(err)
      })

  }


  const routeToUpdate = () => {
    push(`/update-movie/${id}`)
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button onClick={routeToUpdate}>Update Movie</button>
      <button onClick={handleDelete}>Delete Movie</button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
