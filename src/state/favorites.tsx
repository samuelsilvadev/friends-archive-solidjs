import {
  Accessor,
  JSX,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

type State = {
  favorites: Accessor<number[]>;
  isFavorite(id: number): boolean;
  onFavorite: (id: number) => void;
  onUnfavorite: (id: number) => void;
};

type Props = {
  children: JSX.Element;
};

const FavoritesContext = createContext<State>();

export const FavoritesProvider = (props: Props) => {
  const [favorites, setFavorites] = createSignal<number[]>([]);

  const isFavorite = (id: number) => {
    return favorites().includes(id);
  };

  const state: State = {
    favorites,
    isFavorite,
    onFavorite: (id: number) => {
      if (isFavorite(id)) {
        return;
      }

      setFavorites((favorites) => [...favorites, id]);
    },
    onUnfavorite(id: number) {
      setFavorites((favorites) =>
        favorites.filter((favoriteId) => favoriteId !== id)
      );
    },
  };

  return (
    <FavoritesContext.Provider value={state}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesState = () => {
  const state = useContext(FavoritesContext);

  if (!state) {
    throw new Error("Favorites state is empty");
  }

  return state;
};
