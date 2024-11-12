import Logo from "../components/AppLogo";
import logoImage from "../assets/logo.png";
import SearchBox from "../components/SearchBox";
import RootPageStyle from "./pages-styles/RootPage.module.css";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalPortal from "../components/ModalPortal";

// import Button from "../components/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInfo } from "@fortawesome/free-solid-svg-icons";
// import MovieCard from "../components/MovieCard";

function RootPage() {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchValue}/${1}`);
  };

  return (
    <div>
      <Navbar logo={logoImage}>
        {/* <li>Top IMDB</li>
        <li>TV Shows</li>
        <li>Movies</li> */}

        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </Navbar>

      <div className={RootPageStyle.rootpageContainer}>
        <div className={RootPageStyle.logo}>
          <Logo
            image={logoImage}
            width={5}
            height={5}
            fontSize={30}
            siteName="SFlix"
            animationOn={true}
          />
        </div>
        {/*You can adjust the height and width of this component through props if needed.👇 */}
        <SearchBox
          handleSearchFn={handleSearch}
          value={searchValue}
          onChangeInputValue={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* how to use MovieCard Component👇 */}
      {/* <MovieCard movieName="Big man!" year={2012} image="src\assets\plm.jpg">
        <Button rightGap={10} iconPlacement="left" width={80}>
          {{
            icon: <FontAwesomeIcon icon={faInfo} />,
            text: "Movies Info",
          }}
        </Button>
      </MovieCard> */}

      {/* how to use Reusable Button component 👇 */}
      {/* <Button rightGap={10} iconPlacement="left">
        {{
          icon: <FontAwesomeIcon icon={faInfo} />,
          text: "Movies Info",
        }}
      </Button> */}
      {/* <ModalPortal /> */}
    </div>
  );
}

export default RootPage;
