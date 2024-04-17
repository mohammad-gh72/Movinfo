import PropTypes from "prop-types";
import NavbarStyles from "./components-styles/Navbar.module.css";

Navbar.propTypes = {
  children: PropTypes.array,
  logo: PropTypes.string,
};
function Navbar({ children, logo }) {
  return (
    <div className={NavbarStyles.navParent}>
      <nav>
        <ul>{children}</ul>
        <img src={logo} alt="logo" />
      </nav>
    </div>
  );
}

export default Navbar;
