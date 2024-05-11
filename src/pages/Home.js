import backgroundImage from "../assets/Home.png"; // Importing background image
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

// Home component
const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(7, 2, 20, 0.5) , rgba(7, 2, 20, 0.5) ), url(${backgroundImage})`, // Setting background image with gradient overlay
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        //justifyContent: "flex-start",
        //alignItems: "flex-start",
        padding: "210px 40px 0",
      }}
    >
      <div>
        {/* Title */}
        <h1
          className="mb-10 text-4xl md:text-7xl lg:text-5xl text-white font-bold mt-0 "
          style={{
            position: "relative",
            zIndex: 1, // Ensuring title is in front of the background
          }}
        >
          Universal Travel
        </h1>

        {/* Subtitle */}
        <p
          className="mb-8 text-base md:text-2xl text-white"
          style={{
            position: "relative",
            zIndex: 1, // Ensuring subtitle is in front of the background
            marginTop: "40px",
            lineHeight: 1.5,
          }}
        >
          Welcome to the infinite expanse of the cosmos, where
          <br />
          every star is a story waiting to be explored..
        </p>

        {/* Button to navigate to APOD page */}
        <div className="mt-5">
          <Link to="/APOD">
            <button
              type="button"
              className="btn btn-home btn-lg bg-blue-900"
              style={{
                borderRadius: 7,
                width: "110px",
                height: "35px",
                color: "white",
                fontSize: "13px",
                marginTop: "20px",
              }}
            >
              Explore more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
