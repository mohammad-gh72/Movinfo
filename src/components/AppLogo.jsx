import { useState } from "react";
import logoStyle from "./components-styles/AppLogo.module.css";
import PropTypes from "prop-types";

Logo.propTypes = {
  image: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
  siteName: PropTypes.string,
  animationOn: PropTypes.bool,
};
function Logo({
  image,
  width = 10,
  height = 10,
  fontSize,
  siteName,
  animationOn = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={logoStyle.logoContainer}>
      <img
        className={animationOn && isHovered ? logoStyle.imageAnimation : ""}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: `${width}rem`,
          height: `${height}rem`,
        }}
        src={image}
        alt="logo"
      />
      {siteName && <p style={{ fontSize: `${fontSize}px` }}>{siteName}</p>}
    </div>
  );
}

export default Logo;
