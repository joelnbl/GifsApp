import { giphyApi } from "../api/giphy.api";

import { type GiphyResponse } from "../intefaces/giphy.response";
import { type Gif } from "./gif.interface";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const response = await giphyApi<GiphyResponse>("/search", {
    params: {
      q: query,
      limit: 10,
    },
  });
  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.fixed_height.width),
    height: Number(gif.images.fixed_height.height),
  }));
};
