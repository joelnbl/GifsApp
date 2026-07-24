import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";

const setup = () => renderHook(() => useGifs());

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = setup();
    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    //
    const { result } = setup();

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = setup();

    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should a list of gifs from cache", async () => {
    //
    const { result } = setup();

    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("This is my custom error"),
    );

    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 8 previous terms", async () => {
    const { result } = setup();

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    const terms = [
      "goku1",
      "goku2",
      "goku3",
      "goku4",
      "goku5",
      "goku6",
      "goku7",
      "goku8",
      "goku9",
    ];

    for (const term of terms) {
      await act(async () => {
        await result.current.handleSearch(term);
      });
    }

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      "goku9",
      "goku8",
      "goku7",
      "goku6",
      "goku5",
      "goku4",
      "goku3",
      "goku2",
    ]);
  });
});
