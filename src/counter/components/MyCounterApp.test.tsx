import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { fireEvent, render, screen } from "@testing-library/react";

describe("MyCounterApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);
    // screen.debug();

    expect(
      screen.getByRole("heading", {
        level: 1,
      }).innerHTML,
    ).toContain(`counter: 0`);

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

  test("should increment the counter", () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole("heading", {
      level: 1,
    });

    const button = screen.getByRole("button", {
      name: "+1",
    });

    fireEvent.click(button);
    // screen.debug();

    expect(labelH1.innerHTML).toContain("counter: 1");
  });

  test("should decrement the counter", () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole("heading", {
      level: 1,
    });

    const button = screen.getByRole("button", {
      name: "-1",
    });

    fireEvent.click(button);

    expect(labelH1.innerHTML).toContain("counter: -1");
  });

  test("should reset the counter", () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole("heading", {
      level: 1,
    });

    const incrementButton = screen.getByRole("button", {
      name: "+1",
    });

    const resetButton = screen.getByRole("button", {
      name: "Reset",
    });

    fireEvent.click(incrementButton);
    expect(labelH1.innerHTML).toContain("counter: 1");

    fireEvent.click(resetButton);
    expect(labelH1.innerHTML).toContain("counter: 0");
  });
});
