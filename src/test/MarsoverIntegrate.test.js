import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Marsrover from "../pages/Marsrover";
import "@testing-library/jest-dom";

// Mock the background image and fetch function
jest.mock("../assets/background.jpg", () => ({
  default: "mock-background-image-path",
}));
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        photos: [
          {
            id: 1,
            img_src: "mock-image-url-1.jpg",
            camera: { name: "mock-camera-1", full_name: "Mock Camera 1" },
            earth_date: "2023-01-01",
            rover: { name: "mock-rover-1" },
          },
          {
            id: 2,
            img_src: "mock-image-url-2.jpg",
            camera: { name: "mock-camera-2", full_name: "Mock Camera 2" },
            earth_date: "2023-01-02",
            rover: { name: "mock-rover-2" },
          },
        ],
      }),
  })
);

describe("MarsRoverPhotos Integration Test", () => {
  it("should render Mars Rover Photos component correctly", async () => {
    render(<Marsrover />);

    // Check if the component renders correctly
    expect(screen.getByText(/Mars Rover Photos/i)).toBeInTheDocument();

    // Check if loading message is displayed initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for photos to be loaded
    await waitFor(() => {
      expect(screen.getByAltText(/Mars Rover Photo - 1/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Mars Rover Photo - 2/i)).toBeInTheDocument();
    });

    // Check if camera options are displayed
    expect(
      screen.getByLabelText(/Select the camera type/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/All Rovers photos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Mock Camera 1/i)).toHaveLength(2); // Use getAllByText
    expect(screen.getAllByText(/Mock Camera 2/i)).toHaveLength(2); // Use getAllByText

    // Check if pagination buttons are displayed
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });
});
