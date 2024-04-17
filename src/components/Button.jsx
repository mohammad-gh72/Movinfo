import ButtonStyle from "./components-styles/Button.module.css";

import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.object,
  leftGap: PropTypes.number,
  rightGap: PropTypes.number,
  iconPlacement: PropTypes.string,
  width: PropTypes.number,
};
function Button({
  children,
  width = 100,
  leftGap = 0,
  rightGap = 0,
  iconPlacement = "left",
}) {
  let iconPlacmentBoolean = iconPlacement;

  switch (iconPlacement) {
    case "left":
      iconPlacmentBoolean = "true";
      break;
    case "right":
      iconPlacmentBoolean = "false";
      break;
    default:
      iconPlacmentBoolean = "undifind";
      break;
  }
  return (
    <div className={ButtonStyle.btnParent}>
      <button
        style={{
          display: "flex",
          width: `${width}%`,
        }}
      >
        {iconPlacmentBoolean === "true" && (
          <>
            <span
              style={{
                marginLeft: `${leftGap}px`,
                marginRight: `${rightGap}px`,
              }}
            >
              {children.icon}
            </span>
            <span> {children.text}</span>
          </>
        )}

        {iconPlacmentBoolean === "false" && (
          <>
            <span> {children.text}</span>
            <span
              style={{
                marginLeft: `${leftGap}px`,
                marginRight: `${rightGap}px`,
              }}
            >
              {children.icon}
            </span>
          </>
        )}
        {iconPlacmentBoolean === "undifind" && (
          <>
            <span>
              undifind command ! only left and right are allowed for
              iconPlacement property
            </span>
          </>
        )}
      </button>
    </div>
  );
}

export default Button;
