import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "Test Title";
  const description = "Test description";

  test("should render the title correctly", () => {
    render(<CustomHeader title={title} />);
    expect(screen.getByText(title)).toBeDefined();
  });

  test("should render the description when provided", () => {
    render(<CustomHeader title={title} description={description} />);

    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe(description);
  });

  test("should not render description when not provided", () => {
    render(<CustomHeader title={title} />);
    expect(screen.getByText(title)).toBeDefined();
    expect(screen.queryByText(description)).toBeNull();
  });
});
