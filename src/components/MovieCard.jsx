import MovieCardStyle from "./components-styles/MovieCard.module.css";
import PropTypes from "prop-types";
import NoImageFound from "../assets/NoImagePlaceholder.png";

//------------------------------

MovieCard.propTypes = {
  year: PropTypes.string,
  movieName: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.object,
  imageLoadErrorImage: PropTypes.string,
};
function MovieCard({
  year,
  movieName,
  image,
  imageLoadErrorImage = NoImageFound,
  onClick,
  children,
}) {
  return (
    <div
      className={MovieCardStyle.movieCardParent}
      title={movieName}
      onClick={onClick}
    >
      <img
        src={image}
        alt={movieName}
        onError={(e) => {
          e.target.src = imageLoadErrorImage;
        }}
      />
      <div className={MovieCardStyle.wrapper}>
        <h3>{year}</h3>
        <h2>
          {movieName.length > 20 ? movieName.slice(0, 20) + "..." : movieName}
        </h2>
      </div>
      <div className={MovieCardStyle.children}>{children}</div>
    </div>
  );
}

export default MovieCard;
