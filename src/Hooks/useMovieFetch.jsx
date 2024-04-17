import { useEffect } from "react";
import { debounce } from "lodash";
function useMovieFetch(url, dispatch, retry, waitingTime) {
  useEffect(() => {
    let controlIfFetchingTakesLongTime;
    const abortController = new AbortController();

    const debouncedFetchMovies = debounce(async () => {
      try {
        dispatch({ type: "isLoading" });
        controlIfFetchingTakesLongTime = setTimeout(() => {
          dispatch({ type: "tokeLongTimeToFetchStopFetching" });
          dispatch({ type: "LoadingIsDone" });
          abortController.abort();
          debouncedFetchMovies.cancel();
        }, waitingTime);

        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          dispatch({
            type: "responseOkProblem",
            payload: "Something went wrong ...",
          });
          throw new Error("Something went wrong ...");
        }

        const data = await response.json();
        if (data.Response === "False") {
          dispatch({
            type: "noMovieFound",
            payload: "No Movie Found !",
          });
          throw new Error("No Movie Found !");
        }

        dispatch({ type: "getMoviesOnSearch", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") console.error(err.message);
      } finally {
        clearTimeout(controlIfFetchingTakesLongTime);
        dispatch({ type: "LoadingIsDone" });
      }
    }, 500);
    if (!retry) {
      debouncedFetchMovies();
    }

    return () => {
      abortController.abort();
      debouncedFetchMovies.cancel();
      clearTimeout(controlIfFetchingTakesLongTime);
    };
  }, [retry, url, dispatch, waitingTime]);
}

export default useMovieFetch;
