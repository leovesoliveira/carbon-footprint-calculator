import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TotalEmissions from "./total-emissions";

describe("TotalEmissions", () => {
  it("renders the title", () => {
    render(
      <TotalEmissions emissions={{ value: "1234.56", unit: "kg CO2e" }} />
    );
    expect(screen.getByText("Your Carbon Footprint is:")).toBeInTheDocument();
  });

  it("formats and displays the emission value correctly", () => {
    render(
      <TotalEmissions emissions={{ value: "1234.56", unit: "kg CO2e" }} />
    );
    expect(screen.getByText("1,234.56")).toBeInTheDocument();
  });

  it("displays the unit correctly", () => {
    render(
      <TotalEmissions emissions={{ value: "1234.56", unit: "kg CO2e" }} />
    );
    expect(screen.getByText("kg CO2e")).toBeInTheDocument();
  });

  it("shows 0 when value is empty", () => {
    render(<TotalEmissions emissions={{ value: "", unit: "kg CO2e" }} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
