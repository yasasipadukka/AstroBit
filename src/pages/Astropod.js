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
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              {title}
            </h5>
            <p
              className="text-lg text-gray-900 dark:text-gray-900 text-center mt-3 mx-4"
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
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center mt-4">
              {title}
            </h5>
            <p
              className="mb-3 font-normal text-2xl text-gray-900 dark:text-gray-900 text-justify mx-4"
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
      <h2 className="text-5xl font-bold text-center mb-8 text-white mt-6">
        Astronomy Picture of the Day
      </h2>{" "}
      <div className="flex justify-center">
        <div
          className="max-w-5xl"
          style={{
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 gap-12 mt-8">
            {renderApod()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Astropod;
