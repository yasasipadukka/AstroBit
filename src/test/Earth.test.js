import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Earth from "../pages/Earth";
import "@testing-library/jest-dom";

jest.mock("../assets/background.jpg", () => ({
  default: "mock-background-image-path",
}));
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([{ image: "test-image", caption: "Test caption" }]),
  })
);

describe("Epic component", () => {
  it("renders without crashing", () => {
    render(<Earth />);
    const headingElement = screen.getByText(
      /Earth Polychromatic Imaging Camera \(EPIC\)/i
    );
    expect(headingElement).toBeInTheDocument();
  });

  it("toggles autoplay when button is clicked", async () => {
    render(<Earth />);
    const autoplayButton = screen.getByText(/Start Autoplay/i);
    fireEvent.click(autoplayButton);

    await waitFor(() => {
      const stopAutoplayButton = screen.getByText(/Stop Autoplay/i);
      expect(stopAutoplayButton).toBeInTheDocument();
    });

    fireEvent.click(autoplayButton);

    await waitFor(() => {
      const startAutoplayButton = screen.getByText(/Start Autoplay/i);
      expect(startAutoplayButton).toBeInTheDocument();
    });
  });
});
