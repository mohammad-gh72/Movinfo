import { createPortal } from "react-dom";
import ModalPortalStyle from "./components-styles/ModalPortal.module.css";
function ModalPortal({ title, year, genre, director, plot, poster, onClick }) {
  return createPortal(
    <div
      onClick={onClick}
      style={{
        width: "100%",
        height: "120vh",
        backgroundColor: "black",
        backgroundColor: "rgba(255,255,255,0.3)",
        position: "absolute",
        zIndex: "9999999999999999",
      }}
    >
      <div className={ModalPortalStyle.parent}>
        <span className={ModalPortalStyle.close} onClick={onClick}>
          &#10006;
        </span>
        <h2>
          {title}
          <span
            style={{ display: "block", fontSize: "14px", fontWeight: "normal" }}
          >
            {year}
          </span>
          <hr style={{ marginTop: "0.5rem" }} />
        </h2>
        <div style={{ display: "flex" }}>
          <img src={poster} alt="poster" />
          <p style={{ marginTop: "2rem", paddingRight: "0.5rem" }}>{plot}</p>
        </div>
        <div style={{ display: "flex" }}>
          <p
            style={{
              padding: "1.5rem",
              fontSize: "12px",
              textTransform: "capitalize",
              textWrap: "nowrap",
            }}
          >
            Genre: {genre}
          </p>
          <p
            style={{
              fontSize: "12px",
              padding: "1.5rem",
              textTransform: "capitalize",
            }}
          >
            Director: {director}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}
export default ModalPortal;
