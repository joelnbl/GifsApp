import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { fireEvent, render, screen } from "@testing-library/react";

// import { useCounter } from "";

const handleAddMock = vi.fn();
const handleSubtract = vi.fn();
const handleReset = vi.fn();

vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 20,
    handleAdd: handleAddMock,
    handleSubtract: handleSubtract,
    handleReset: handleReset,
  }),
}));

describe("MyCounterApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);

    expect(
      screen.getByRole("heading", {
        level: 1,
      }).innerHTML,
    ).toContain(`counter: 20`);

    expect(
      screen.getByRole("button", {
        name: "+1",
      }),
    ).toBeDefined();

    expect(
      screen.getByRole("button", {
        name: "-1",
      }),
    ).toBeDefined();

    expect(
      screen.getByRole("button", {
        name: "Reset",
      }),
    ).toBeDefined();
  });

  test("should call handleAdd if button is clicked", () => {
    //
    render(<MyCounterApp />);

    const button = screen.getByRole("button", {
      name: "+1",
    });

    fireEvent.click(button);

    expect(handleAddMock).toHaveBeenCalled();
    expect(handleSubtract).not.toHaveBeenCalled();
    expect(handleReset).not.toHaveBeenCalled();
  });
});
