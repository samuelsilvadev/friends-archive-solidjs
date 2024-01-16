import { JSX, createResource, createSignal } from "solid-js";
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

  const renderContent = () => {
    if (data.loading) {
      return "Loading";
    }

    const readableData = data();

    if (data.error || readableData instanceof Error) {
      return "Error";
    }

    if (!readableData) {
      return "Empty";
    }

    return (
      <>
        <h1>{readableData.name}</h1>
        <input
          class="search"
          type="search"
          value={episodeName()}
          onInput={handleEpisodeNameChange}
        />
        <Tabs
          tabs={[
            {
              title: "All Episodes",
              content: (
                <EpisodesList
                  episodes={filterEpisodes(
                    readableData._embedded.episodes,
                    episodeName()
                  )}
                />
              ),
            },
            {
              title: "Favorites",
              content: null,
            },
          ]}
        ></Tabs>
      </>
    );
  };

  return <main>{renderContent()}</main>;
}

export default App;
