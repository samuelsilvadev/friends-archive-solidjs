import { ErrorBoundary, Suspense } from "solid-js";
import { useFavoritesState } from "../../state/favorites";
import { Episode } from "../../types";
import { EpisodesList } from "../episodes-list/EpisodesList";

type Props = {
  episodes: Episode[];
};

function filterFavoriteEpisodes(episodes: Episode[], favorites: number[]) {
  return episodes.filter((episode) => favorites.includes(episode.id));
}

export function FavoritesList(props: Props) {
  const { favorites } = useFavoritesState();

  return (
    <ErrorBoundary fallback={"Failed to load favorite episodes"}>
      <Suspense fallback="Loading...">
        <EpisodesList
          episodes={filterFavoriteEpisodes(props.episodes, favorites())}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
