import { useState } from "react";

import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";

import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import { type Gif } from "./gifs/actions/gif.interface";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleSearch = async (query: string = "") => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length == 0) return;

    if (!previousTerms.includes(trimmed)) {
      setPreviousTerms([trimmed, ...previousTerms].splice(0, 7));
    }

    const gifs = await getGifsByQuery(trimmed);
    setGifs(gifs);
  };

  const handleTermClicked = (term: string) => {
    handleSearch(term);
  };

  return (
    <>
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />

      <SearchBar placeholder="Buscar gifs" onQuery={handleSearch} />

      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      <GifList gifs={gifs} />
    </>
  );
};
