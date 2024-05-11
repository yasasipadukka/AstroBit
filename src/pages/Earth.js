import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/background.jpg";

const Epic = () => {
  // State variables for date, images, current index, and autoplay
  const [date, setDate] = useState("2019-05-30");
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  // NASA API key
  const API_KEY = "fSfvFbgfho7qklWhAxFTegQliKyYVVnVBUG0OTi3";

  // Fetch images for the selected date
  const fetchImages = async () => {
    const response = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      setImages(data);
      setCurrentIndex(0);
    } else {
      setImages([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [date]);

  // Autoplay functionality
  useEffect(() => {
    let intervalId;
    if (autoplay && images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [autoplay, images]);

  // Handle date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Handle toggle autoplay
  const handleToggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  // Component JSX
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(7, 2, 20, 0.5) , rgba(7, 2, 20, 0.5) ), url(${backgroundImage})`,
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "50px 10px ",
      }}
    >
      <h2 className="text-4xl font-bold text-center mb-8 text-white mt-2">
        Earth Polychromatic Imaging Camera (EPIC)
      </h2>{" "}
      <div className="flex justify-center items-center space-x-12 md:mb-6">
        <div>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="p-1 border border-gray-300 rounded-lg text-center text-black"
            min="2015-09-01"
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="ml-4 text-base">
          <button
            onClick={handleToggleAutoplay}
            className={`bg-gray-600 hover:bg-gray text-white  font-bold py-2 px-5 rounded ${
              autoplay ? "bg-red-500 hover:bg-red-700" : ""
            }`}
          >
            {autoplay ? "Stop Autoplay" : "Start Autoplay"}
          </button>
        </div>
      </div>
      {images.length > 0 ? (
        <div className="text-center">
          <img
            src={`https://epic.gsfc.nasa.gov/archive/natural/${date
              .split("-")
              .join("/")}/png/${images[currentIndex].image}.png`}
            alt="NASA EPIC"
            className="mx-auto max-w-full h-auto px-6 py-2 lg:px-28"
            style={{ maxHeight: "70vh" }}
          />
          <p className="mt-2 text-xs lg:text-sm text-white">
            {images[currentIndex].caption}
          </p>
        </div>
      ) : (
        <p className="text-white text-center">No data for selected date</p>
      )}
    </div>
  );
};

export default Epic;
