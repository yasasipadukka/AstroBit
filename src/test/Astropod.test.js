import React from "react";
import { render, waitFor } from "@testing-library/react";
import Astropod from "../../src/pages/Astropod";
import "@testing-library/jest-dom";

jest.mock("../assets/background.jpg", () => "mock-background-image-path");
// Mock fetch function
global.fetch = jest.fn();

describe("Astropod component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with image media type", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          title: "Test Title",
          url: "https://example.com/image.jpg",
          explanation: "Test explanation",
          media_type: "image",
        }),
    });

    const { getByAltText, getByText } = render(<Astropod />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String));
      expect(getByAltText("Test Title")).toBeInTheDocument();
      expect(getByText("Test Title")).toBeInTheDocument();
      expect(getByText("Test explanation")).toBeInTheDocument();
    });
  });

  it("renders with video media type", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          title: "Test Video Title",
          url: "https://example.com/video.mp4",
          explanation: "Test video explanation",
          media_type: "video",
        }),
    });

    const { getByTitle, getByText } = render(<Astropod />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String));
      expect(getByTitle("Test Video Title")).toBeInTheDocument();
      expect(getByText("Test Video Title")).toBeInTheDocument();
      expect(getByText("Test video explanation")).toBeInTheDocument();
    });
  });

  it("renders error message if data fetching fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    const { getByText } = render(<Astropod />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String));
      expect(
        getByText("Data Not Available for This Date.")
      ).toBeInTheDocument();
    });
  });
});
