import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

const setup = (initialValue = 10) => renderHook(() => useCounter(initialValue));

describe("useCounter", () => {
  test("should initialize with the default value", () => {
    const { result } = setup();

    expect(result.current.counter).toBe(10);
  });

  test("should initialize with a custom value", () => {
    const { result } = setup(20);

    expect(result.current.counter).toBe(20);
  });

  test("should increment the counter", () => {
    const { result } = setup();

    act(() => result.current.handleAdd());

    expect(result.current.counter).toBe(11);
  });

  test("should decrement the counter", () => {
    const { result } = setup();

    act(() => result.current.handleSubtract());

    expect(result.current.counter).toBe(9);
  });

  test("should reset the counter to the initial value", () => {
    const { result } = setup();

    act(() => result.current.handleAdd());
    act(() => result.current.handleReset());

    expect(result.current.counter).toBe(10);
  });
});
