import { ErrorBoundary, Suspense } from "solid-js";
import { EpisodesList } from "../episodes-list/EpisodesList";
import { Episode } from "../../types";

type Props = {
  episodes: Episode[];
  episodeName: string;
};

function filterEpisodes(episodes: Episode[], searchQuery: string) {
  return episodes.filter((episode) =>
    episode.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

export function AllEpisodesList(props: Props) {
  return (
    <ErrorBoundary fallback={"Failed to load episodes"}>
      <Suspense fallback="Loading...">
        <EpisodesList
          episodes={filterEpisodes(props.episodes, props.episodeName)}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
