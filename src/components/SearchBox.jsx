import SearchBoxStyle from "./components-styles/SearchBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

SearchBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  handleSearchFn: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChangeInputValue: PropTypes.func.isRequired,
};
function SearchBox({
  width = 30,
  height = 3,
  handleSearchFn,
  value,
  onChangeInputValue,
}) {
  return (
    <div className={SearchBoxStyle.searchContainer}>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          value && handleSearchFn();
        }}
      >
        <div style={{ width: `${width}rem` }}>
          <input
            value={value}
            style={{ height: `${height}rem` }}
            type="text"
            placeholder="Search ..."
            onChange={onChangeInputValue}
          />
          <button>
            <FontAwesomeIcon
              icon={faSearch}
              className={SearchBoxStyle.searchIcon}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBox;
