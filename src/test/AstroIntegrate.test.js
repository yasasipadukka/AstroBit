import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Astropod from "../pages/Astropod";
import "@testing-library/jest-dom";

// Mock the background image and fetch function
jest.mock("../assets/background.jpg", () => ({
  default: "mock-background-image-path",
}));
global.fetch = jest.fn((url) => {
  if (url.includes("planetary/apod")) {
    // Mock successful API response for image
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          title: "Mock APOD Title",
          url: "mock-image-url.jpg",
          explanation: "Mock APOD explanation",
          media_type: "image",
        }),
    });
  } else if (url.includes("planetary/apod/video")) {
    // Mock successful API response for video
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          title: "Mock APOD Video Title",
          url: "mock-video-url.mp4",
          explanation: "Mock APOD video explanation",
          media_type: "video",
        }),
    });
  } else {
    // Mock failed API response
    return Promise.resolve({ ok: false });
  }
});

describe("Astropod Integration Test", () => {
  it("should render Astronomy Picture of the Day component with image correctly", async () => {
    await act(async () => {
      render(<Astropod />);
    });

    // Check if the component renders correctly
    expect(
      screen.getByText(/Astronomy Picture of the Day/i)
    ).toBeInTheDocument();

    // Check if the component fetches APOD image data and renders it
    await waitFor(() => {
      expect(screen.getByAltText("Mock APOD Title")).toBeInTheDocument();
      expect(screen.getByText("Mock APOD explanation")).toBeInTheDocument();
    });
  });
});
