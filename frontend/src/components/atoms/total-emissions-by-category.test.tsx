import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TotalEmissionsByCategory from "./total-emissions-by-category";

describe("TotalEmissionsByCategory", () => {
  it("renders the correct name and emissions values", () => {
    render(
      <TotalEmissionsByCategory
        name="Transportation"
        emissions={{ value: "1234.56", unit: "kg CO2e" }}
      />
    );

    expect(screen.getByText("In Transportation is:")).toBeInTheDocument();
    expect(screen.getByText("1,234.56")).toBeInTheDocument();
    expect(screen.getByText("kg CO2e")).toBeInTheDocument();
  });

  it("renders 0 if emissions value is empty", () => {
    render(
      <TotalEmissionsByCategory
        name="Heating"
        emissions={{ value: "", unit: "kg CO2e" }}
      />
    );

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("kg CO2e")).toBeInTheDocument();
  });
});
