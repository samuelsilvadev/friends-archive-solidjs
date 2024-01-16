import { Movies } from "../types";

const API_URL =
  "https://api.tvmaze.com/singlesearch/shows?q=friends&embed=episodes";

export async function fetchMovies(): Promise<Movies | Error> {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }

    return new Error("Unable to identify issue source while fetching movies.");
  }
}
