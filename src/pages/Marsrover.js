import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/background.jpg";

const MarsRoverPhotos = () => {
  // State variables for rover photos, loading state, current page, and selected camera
  const [roverPhotos, setRoverPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCamera, setSelectedCamera] = useState("");
  const photosPerPage = 9;

  // NASA API key
  const API_KEY = "fSfvFbgfho7qklWhAxFTegQliKyYVVnVBUG0OTi3";

  // Fetch rover photos on component mount and when roverPhotos or API_KEY changes
  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRoverPhotos(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Mars Rover photos:", error);
      }
    };

    if (!roverPhotos) {
      fetchRoverPhotos();
    }
  }, [roverPhotos, API_KEY]);

  // Filter photos based on selected camera
  const filteredPhotos = roverPhotos
    ? selectedCamera
      ? roverPhotos.photos.filter(
          (photo) => photo.camera.name === selectedCamera
        )
      : roverPhotos.photos
    : [];

  // Pagination logic
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = filteredPhotos.slice(
    indexOfFirstPhoto,
    indexOfLastPhoto
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPhotos.length / photosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle camera selection change
  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    setCurrentPage(1);
  };

  // Generate sorted camera options
  const sortedCameraOptions = roverPhotos
    ? roverPhotos.photos
        .reduce((cameras, photo) => {
          if (!cameras.find((camera) => camera.name === photo.camera.name)) {
            cameras.push({
              name: photo.camera.name,
              fullName: photo.camera.full_name,
            });
          }
          return cameras;
        }, [])
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
    : [];

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
        padding: "20px",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-white ">
          Mars Rover Photos
        </h2>
        <div className="flex flex-col md:flex-row justify-center mb-4 items-center">
          <label
            htmlFor="cameraSelect"
            className="mr-0 md:mr-7 font-semibold text-white text-xl md:text-2xl mt-3 md:mt-0"
            style={{ fontSize: "clamp(16px, 4vw, 20px)" }}
          >
            Select the camera type
          </label>
          <select
            id="cameraSelect"
            value={selectedCamera}
            onChange={handleCameraChange}
            className="p-3 border border-gray-300 rounded-md w-full md:w-auto"
          >
            <option value="">All Rovers photos</option>
            {sortedCameraOptions.map((camera) => (
              <option key={camera.name} value={camera.name}>
                {camera.fullName}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <p className="text-center text-white text-xl">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-12">
              {currentPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md p-4"
                >
                  <img
                    className="w-full"
                    src={photo.img_src}
                    alt={`Mars Rover Photo - ${photo.id}`}
                  />
                  <div className="mt-4">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      {photo.camera.full_name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Earth Date: {photo.earth_date}
                    </p>
                    <p className="text-gray-600">Rover: {photo.rover.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-full mr-2 ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                Prev
              </button>
              {[
                ...Array(
                  Math.ceil(filteredPhotos.length / photosPerPage)
                ).keys(),
              ]
                .slice(currentPage - 1, currentPage + 4)
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-1 rounded-full mx-1 ${
                      currentPage === number + 1
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              <button
                onClick={nextPage}
                disabled={
                  currentPage ===
                  Math.ceil(filteredPhotos.length / photosPerPage)
                }
                className={`px-3 py-1 rounded-full ml-2 ${
                  currentPage ===
                  Math.ceil(filteredPhotos.length / photosPerPage)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
