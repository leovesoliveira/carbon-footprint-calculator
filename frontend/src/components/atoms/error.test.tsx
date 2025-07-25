import { render, screen } from "@testing-library/react";
import Error from "./error";
import { describe, it, expect } from "vitest";

describe("Error component", () => {
  it("should render the error message", () => {
    render(<Error />);

    const message = screen.getByText("Something went wrong!");
    expect(message).toBeInTheDocument();
  });
});
