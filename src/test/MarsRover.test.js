import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import Marsrover from "../pages/Marsrover";
import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks(); // Enable fetch mocking

jest.mock("../assets/background.jpg", () => ({
  default: "mock-background-image-path",
}));

// Mock rover photos data
const mockRoverPhotos = {
  photos: [
    {
      id: 1,
      img_src: "path_to_image_1",
      camera: { name: "Camera1", full_name: "Full Name 1" },
      earth_date: "2024-05-01",
      rover: { name: "Rover1" },
    },
    {
      id: 2,
      img_src: "path_to_image_2",
      camera: { name: "Camera2", full_name: "Full Name 2" },
      earth_date: "2024-05-02",
      rover: { name: "Rover2" },
    },
  ],
};

describe("MarsRoverPhotos component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders loading message initially", () => {
    render(<Marsrover />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
