import { ALL_MOVIES } from "./data/movies";
import MovieItem from "./components/MovieItem";
import Modal from "./components/ui/Modal";
import MovieForm from "./components/MovieForm";
import { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState(ALL_MOVIES.items);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const handleRemoveMovie = (movie) => {
    setMovies((prev) => prev.filter((m) => m.id !== movie.id));
    setCurrentMovie(null);
    setShowMovieForm(false);
  };
  const handleRemoveRatings = () => {
    setMovies((prev) => prev.map((movie) => ({ ...movie, rating: null })));
    setCurrentMovie(null);
    setShowMovieForm(false);
  };
  const handleRatingChange = (movie, rating) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === movie.id ? { ...m, rating } : m))
    );
  };

  return (
    <div className="app">
     <button className="btn btn-primary" onClick={() =>
      {
        setCurrentMovie(null);
        setShowMovieForm(true);
      }
     }>Add Movie</button>

     <button className="btn btn-primary" onClick={handleRemoveRatings}>Remove Ratings</button>
      
      <Modal
        onClose={() => setShowMovieForm(false)}
        isOpen={showMovieForm}
        title={currentMovie?.id ? "Edit Movie" : "Add Movie"}
      >
        <MovieForm
          movie={currentMovie}
          onSave={(data) => {
            if (currentMovie) {
              setMovies((prev) =>
                prev.map((m) =>
                  m.id === currentMovie.id
                    ? { ...data, id: currentMovie.id, rating: currentMovie.rating }
                    : m
                )
              );
            } else {
              setMovies((prev) => [...prev, { ...data, id: Date.now() }]);
            }
            setShowMovieForm(false);
          }}
          onCancel={() => {
            setShowMovieForm(false);
          }}
        />
      </Modal>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            setShowMovieForm={setShowMovieForm}
            setCurrentMovie={setCurrentMovie}
            onRemove={handleRemoveMovie}
            onRatingChange={handleRatingChange}
          />
        ))}
      </div>
    </div>
  );
}
