import { ErrorBoundary, JSX, createResource, createSignal } from "solid-js";
import { Tabs } from "./components/tabs/Tabs";
import { fetchMovies } from "./services/api";
import { FavoritesProvider } from "./state/favorites";
import { FavoritesList } from "./components/favorites-list/FavoritesList";
import { AllEpisodesList } from "./components/all-episodes-list/AllEpisodesList";
import "./App.css";

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
    <FavoritesProvider>
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
                  <AllEpisodesList
                    episodes={data()?._embedded.episodes ?? []}
                    episodeName={episodeName()}
                  />
                ),
              },
              {
                title: "Favorites",
                content: (
                  <FavoritesList episodes={data()?._embedded.episodes ?? []} />
                ),
              },
            ]}
          />
        </ErrorBoundary>
      </main>
    </FavoritesProvider>
  );
}

export default App;
