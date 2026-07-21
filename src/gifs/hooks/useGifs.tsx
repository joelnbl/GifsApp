import { useRef, useState } from "react";

import type { Gif } from "../actions/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleSearch = async (query: string = "") => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length == 0) return;

    if (!previousTerms.includes(trimmed)) {
      setPreviousTerms([trimmed, ...previousTerms].splice(0, 7));
    }

    const gifs = await getGifsByQuery(trimmed);
    setGifs(gifs);

    gifsCache.current[query] = gifs;
  };

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };
  return {
    //   Properties
    gifs,

    // Methods
    handleSearch,
    handleTermClicked,
    previousTerms,
  };
};
