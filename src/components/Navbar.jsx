import NavbarStyles from "./components-styles/Navbar.module.css";

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
