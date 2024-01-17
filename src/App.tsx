import {
  ErrorBoundary,
  JSX,
  Suspense,
  createResource,
  createSignal,
} from "solid-js";
import "./App.css";
import { Episode } from "./types";
import { EpisodesList } from "./components/episodes-list/EpisodesList";
import { Tabs } from "./components/tabs/Tabs";
import { fetchMovies } from "./services/api";

function filterEpisodes(episodes: Episode[], searchQuery: string) {
  return episodes.filter((episode) =>
    episode.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

function App() {
  const [data] = createResource(fetchMovies);
  const [episodeName, setEpisodeName] = createSignal("");

  const handleEpisodeNameChange: JSX.InputEventHandlerUnion<
    HTMLInputElement,
    InputEvent
  > = (event) => {
    setEpisodeName(event.currentTarget.value);
  };

  return (
    <main>
      <ErrorBoundary fallback={"Something Went Really Wrong"}>
        <h1>Friends Archive</h1>
        <input
          class="search"
          type="search"
          value={episodeName()}
          onInput={handleEpisodeNameChange}
          disabled={data.state === "errored"}
        />
        <Tabs
          tabs={[
            {
              title: "All Episodes",
              content: (
                <ErrorBoundary fallback={"Failed to load episodes"}>
                  <Suspense fallback="Loading...">
                    <EpisodesList
                      episodes={filterEpisodes(
                        data()?._embedded.episodes ?? [],
                        episodeName()
                      )}
                    />
                  </Suspense>
                </ErrorBoundary>
              ),
            },
            {
              title: "Favorites",
              content: null,
            },
          ]}
        />
      </ErrorBoundary>
    </main>
  );
}

export default App;
