import { Show, createEffect } from "solid-js";
import { useFavoritesState } from "../../state/favorites";
import { Image } from "../../types";
import styles from "./episodeCard.module.css";

type Props = {
  episodeId: number;
  name: string;
  image: Image;
  season: number;
  episodeNumber: number;
};

export function EpisodeCard(props: Props) {
  const { onFavorite, onUnfavorite, isFavorite } = useFavoritesState();

  const handleOnFavorite = () => onFavorite(props.episodeId);

  const handleOnUnfavorite = () => onUnfavorite(props.episodeId);

  return (
    <section class={styles.item}>
      <img
        class={styles.image}
        src={props.image.medium}
        alt={`${props.name}`}
        aria-hidden
        loading="lazy"
        width="250"
        height="140"
      />
      <div class={styles.content}>
        <h2 class={styles.title}> {props.name}</h2>
        <p>
          Season: {props.season}, Number: {props.episodeNumber}
        </p>
        <Show
          fallback={<button onClick={handleOnFavorite}>Favorite</button>}
          when={isFavorite(props.episodeId)}
        >
          <button onClick={handleOnUnfavorite}>Unfavorite</button>
        </Show>
      </div>
    </section>
  );
}
