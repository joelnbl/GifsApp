import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("SearhBar", () => {
  test("should render searchbar correctly", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot();

    expect(screen.getByRole("textbox")).toBeDefined();

    expect(
      screen.getByRole("button", {
        name: "Buscar",
      }),
    ).toBeDefined();
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    vi.useFakeTimers();

    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });
    vi.advanceTimersByTime(700);

    expect(onQuery).toHaveBeenCalled();
    expect(onQuery).toHaveBeenCalledWith("test");

    vi.useRealTimers();
  });

  test("should call only once with the last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: {
        value: "t",
      },
    });
    fireEvent.change(input, {
      target: {
        value: "te",
      },
    });
    fireEvent.change(input, {
      target: {
        value: "tes",
      },
    });
    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should call onQuery when button clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("test");
  });

  test("should the input has the correct placeholder value", () => {
    render(<SearchBar onQuery={() => {}} placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText("Test placeholder")).toBeDefined();
  });
});
