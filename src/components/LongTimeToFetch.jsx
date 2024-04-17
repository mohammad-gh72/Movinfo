import { useEffect, useState } from "react";

function LongTimeToFetch({ handleRetryFetching, retryAfterMin = 3000 }) {
  const [retrySlowDown, setRetrySlowDown] = useState(false);

  useEffect(() => {
    const timesOut = setTimeout(() => {
      setRetrySlowDown(true);
    }, retryAfterMin);

    return () => clearTimeout(timesOut);
  }, [retryAfterMin]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        gap: "16px",
      }}
    >
      <span style={{ color: "white" }}>
        Something went wrong. Check your internet connection
      </span>{" "}
      {retrySlowDown && (
        <button
          style={{
            width: "fit-content",
            margin: "0 auto",
            padding: "0.5rem",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            setRetrySlowDown(false);
            handleRetryFetching();
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default LongTimeToFetch;
