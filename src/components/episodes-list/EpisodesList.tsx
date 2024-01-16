import { For } from "solid-js";
import { Episode } from "../../types";
import styles from "./episodes.module.css";
import { EpisodeCard } from "../episode-card/EpisodeCard";

type Props = {
  episodes: Episode[];
};

export function EpisodesList(props: Props) {
  return (
    <ul class={styles.list}>
      <For each={props.episodes}>
        {({ name, image, season, number }) => (
          <li class={styles.item}>
            <EpisodeCard
              name={name}
              image={image}
              season={season}
              episodeNumber={number}
            />
          </li>
        )}
      </For>
    </ul>
  );
}
