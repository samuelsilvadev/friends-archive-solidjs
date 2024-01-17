import { Movies } from "../types";

const API_URL =
  "https://api.tvmaze.com/singlesearch/shows?q=friends&embed=episodes";

export async function fetchMovies(): Promise<Movies> {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
