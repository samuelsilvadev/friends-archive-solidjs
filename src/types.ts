export interface Movies {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: null;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel: null;
  dvdCountry: null;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: MoviesLinks;
  _embedded: Embedded;
}

export interface Embedded {
  episodes: Episode[];
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: Type;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: Rating;
  image: Image;
  summary: string;
  _links: EpisodeLinks;
}

export interface EpisodeLinks {
  self: Previousepisode;
  show: Previousepisode;
}

export interface Previousepisode {
  href: string;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Rating {
  average: number;
}

export enum Type {
  Regular = "regular",
}

export interface MoviesLinks {
  self: Previousepisode;
  previousepisode: Previousepisode;
}

export interface Externals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Schedule {
  time: string;
  days: string[];
}
