import { useEffect, useReducer, useState } from "react";
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
import ModalPortal from "../components/ModalPortal";
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
  const [showModal, setShowModal] = useState(false);
  const [imdbId, setImdbId] = useState(null);
  const [movieDataForModal, setMovieDataForModal] = useState({});
  const [isDataForModaLoading, setIsDataForModalLoding] = useState(false);
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

  useEffect(() => {
    if (!imdbId) return;
    async function fetchMoviesINfoModalData() {
      try {
        setIsDataForModalLoding(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${imdbId}`
        );
        if (!res.ok) {
          throw new Error("something went wrong!");
        }
        const data = await res.json();
        setMovieDataForModal(data);
        console.log("hi");
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataForModalLoding(false);
      }
    }
    fetchMoviesINfoModalData();
  }, [imdbId]);

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
          {/* <li>Top IMDB</li>
          <li>TV Shows</li>
          <li>Movies</li> */}
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
                  onClick={() => setImdbId(movie.imdbID)}
                >
                  <Button
                    rightGap={10}
                    iconPlacement="left"
                    width={80}
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
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
        {showModal &&
          (isDataForModaLoading ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <Loading />
            </div>
          ) : (
            <ModalPortal
              title={movieDataForModal.Title}
              year={movieDataForModal.Year}
              genre={movieDataForModal.Genre}
              director={movieDataForModal.Director}
              plot={movieDataForModal.Plot}
              poster={movieDataForModal.Poster}
              onClick={() => {
                // setMovieDataForModal({});
                setShowModal(false);
              }}
            />
          ))}
      </div>
    </>
  );
}

export default SearchResault;
