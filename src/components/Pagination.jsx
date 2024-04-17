import PaginationStyle from "./components-styles/Pagination.module.css";

const currentPageStyle = {
  backgroundColor: "#00acc1",
  color: "#fff",
};

function Pagination({
  totalResult,
  numberOfShownPagesBtn = 10,
  setPageHandler,
  next,
  prev,
  pageStart,
  pageEnd,
  curentPage = 1,
}) {
  const searchRes = Math.ceil(totalResult / 10);

  return (
    <div className={PaginationStyle.pagesParent}>
      {pageStart >= numberOfShownPagesBtn && (
        <button
          className={PaginationStyle.prev}
          onClick={() => {
            prev(numberOfShownPagesBtn);
          }}
        >
          &lsaquo;
        </button>
      )}

      {/* //---------------------------- */}

      {[...Array(searchRes)]
        .map((_, index) => (
          <button
            style={index + 1 === curentPage ? currentPageStyle : null}
            onClick={() => setPageHandler(index + 1)}
            key={index}
          >
            {index + 1}
          </button>
        ))
        .slice(pageStart, pageEnd)}

      {/* //---------------------- */}

      {pageEnd < searchRes && (
        <button
          className={PaginationStyle.next}
          onClick={() => {
            next(numberOfShownPagesBtn);
          }}
        >
          &rsaquo;
        </button>
      )}
    </div>
  );
}

export default Pagination;
