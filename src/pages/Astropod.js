import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/background.jpg";

const Astropod = () => {
  // State variables for date and APOD data
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [apodData, setApodData] = useState(null);

  // NASA API key
  const API_KEY = "fSfvFbgfho7qklWhAxFTegQliKyYVVnVBUG0OTi3";

  // Fetch APOD data on component mount and when date changes
  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error("Error fetching APOD data:", error);
      }
    };
    fetchApodData();
  }, [date]);

  // Render APOD content based on media type
  const renderApod = () => {
    if (!apodData) {
      return <p className="py-3">Data Not Available for This Date.</p>;
    }

    const { title, url, explanation, media_type } = apodData;
    if (media_type === "image") {
      return (
        <>
          <img src={url} alt={title} className="rounded-t-lg object-cover" />
          <div className="mt-4">
            <h5 className="text-lg md:text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">
              {title}
            </h5>
            <p
              className="text-base md:text-base text-gray-900 dark:text-gray-900 text-center mt-3 mx-4 mb-4"
              style={{ textAlign: "justify" }}
            >
              {explanation}
            </p>
          </div>
        </>
      );
    } else if (media_type === "video") {
      return (
        <>
          <div className="video-container">
            <iframe
              title={title}
              src={url}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="mt-4">
            <h5 className="mb-2 text-xl md:text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center mt-4">
              {title}
            </h5>
            <p
              className="mb-3 text-base md:text-base font-normal text-gray-900 dark:text-gray-900 text-justify mx-4"
              style={{ padding: "20px", margin: "20px 10px" }}
            >
              {explanation}
            </p>
          </div>
        </>
      );
    }
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
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-5 text-white mt-2">
        Astronomy Picture of the Day
      </h2>{" "}
      <div className="flex justify-center">
        <div className="max-w-screen-md">
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 gap-12 mt-8">
            {renderApod()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Astropod;
