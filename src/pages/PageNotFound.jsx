import Navbar from "../components/Navbar";
import logoImage from "../assets/logo.png";
function NotFound() {
  return (
    <div>
      <Navbar logo={logoImage}>
        <li>Top IMDB</li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>Home</li>
      </Navbar>
      <div
        style={{
          color: "white",
          fontSize: "25px",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Page Not Found !
        <div>
          <p style={{ fontSize: "16px", width: "40%", margin: "1rem auto" }}>
            It seems like the page you're trying to access doesn't exist. This
            could be due to entering an incorrect URL or navigating to a route
            that doesn't exist. Please check the URL and try again. If you're
            looking for something specific, consider using the search box to
            find what you're looking for. Happy searching!
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
