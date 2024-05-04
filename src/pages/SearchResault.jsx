import { useEffect, useReducer } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import SearchResaultStyle from "./pages-styles/SearchResault.module.css";
import Navbar from "../components/Navbar";
import logoImage from "../assets/logo.png";
import Pagination from "../components/Pagination";
import LongTimeToFetch from "../components/LongTimeToFetch";
import Loading from "../components/Loading";
import useMovieFetch from "../Hooks/useMovieFetch";
import ErrorMessages from "../components/ErrorMessages";
//-----------------------------------------------------------------------------
const KEY = "5bc11b";
const initialState = {
  movieList: [],
  isLoading: false,
  errorMessagesText: null,
  retry: false,
  pageStart: 0,
  pageEnd: 10,
};
function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: true };
    case "responseOkProblem":
      return { ...state, errorMessagesText: action.payload };
    case "noMovieFound":
      return { ...state, errorMessagesText: action.payload };
    case "makeListOfMoviesEmptyIfThereIsAnyNotFoundError":
      return { ...state, movieList: [] };
    case "weHaveMoviesInListSoWeDeletePossbleErrorMessagesText":
      return { ...state, errorMessagesText: null };
    case "needToTryToFetchAgain":
      return { ...state, retry: false };
    case "tokeLongTimeToFetchStopFetching":
      return { ...state, retry: true };
    case "LoadingIsDone":
      return { ...state, isLoading: false };
    case "getMoviesOnSearch":
      return { ...state, movieList: action.payload };
    case "nextPagination":
      return {
        ...state,
        pageStart: state.pageEnd,
        pageEnd: state.pageEnd + action.payload,
      };
    case "prevPagination":
      return {
        ...state,
        pageEnd: state.pageStart,
        pageStart: state.pageStart - action.payload,
      };
  }
}

function SearchResault() {
  const { movieName, page } = useParams();
  const navigateBetweenPages = useNavigate();

  //------------
  const [
    { movieList, isLoading, pageStart, pageEnd, retry, errorMessagesText },
    dispatch,
  ] = useReducer(reducer, initialState);
  //--------------------
  useMovieFetch(
    `https://www.omdbapi.com/?apikey=${KEY}&s=${movieName}&page=${page}`,
    dispatch,
    retry,
    5000
  );
  //---------------

  function handlingPageToShowOnFetch(index) {
    dispatch({ type: "needToTryToFetchAgain" });
    navigateBetweenPages(`/search/${movieName}/${index}`);
  }

  function handleRetryFetching() {
    dispatch({ type: "needToTryToFetchAgain" });
  }

  function handlePaginationNextBtn(numberOfShownPagesBtn) {
    dispatch({ type: "nextPagination", payload: numberOfShownPagesBtn });
  }
  function handlePaginationPrevBtn(numberOfShownPagesBtn) {
    dispatch({ type: "prevPagination", payload: numberOfShownPagesBtn });
  }

  //------------------
  return (
    <>
      <div style={{ position: "relative", height: "100vh" }}>
        <Navbar logo={logoImage}>
          <li>Top IMDB</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </Navbar>

        {isLoading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              buttom: "50%",
              left: "25%",
              right: "25%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loading />
          </div>
        ) : retry ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              buttom: "50%",
              left: "25%",
              right: "25%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LongTimeToFetch handleRetryFetching={handleRetryFetching} />
          </div>
        ) : (
          <div className={SearchResaultStyle.foundedMovieItemsParent}>
            {errorMessagesText && (
              <ErrorMessages errorMessagesText={errorMessagesText} />
            )}
            {movieList.Search &&
              movieList.Search.map((movie, ind) => (
                <MovieCard
                  key={ind}
                  movieName={movie.Title}
                  year={movie.Year}
                  image={movie.Poster}
                >
                  <Button rightGap={10} iconPlacement="left" width={80}>
                    {{
                      icon: <FontAwesomeIcon icon={faInfo} />,
                      text: "Movie Info",
                    }}
                  </Button>
                </MovieCard>
              ))}
            {movieList.Search && (
              <div className={SearchResaultStyle.pagination}>
                <Pagination
                  totalResult={Number(movieList.totalResults)}
                  setPageHandler={handlingPageToShowOnFetch}
                  next={handlePaginationNextBtn}
                  prev={handlePaginationPrevBtn}
                  pageStart={pageStart}
                  pageEnd={pageEnd}
                  curentPage={Number(page)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResault;
