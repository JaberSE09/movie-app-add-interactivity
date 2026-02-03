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

  return (
    <div className="app">
      <Modal
        onClose={() => setShowMovieForm(false)}
        isOpen={showMovieForm}
        title={currentMovie?.id ? "Edit Movie" : "Add Movie"}
      >
        <MovieForm
          movie={currentMovie}
          onSave={(data) => {
            console.log("Movie saved:", data);
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
          />
        ))}
      </div>
    </div>
  );
}
