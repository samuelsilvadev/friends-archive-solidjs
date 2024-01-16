import { Image } from "../../types";
import styles from "./episodeCard.module.css";

type Props = {
  name: string;
  image: Image;
  season: number;
  episodeNumber: number;
};

export function EpisodeCard(props: Props) {
  return (
    <section class={styles.item}>
      <h2 class={styles.title}> {props.name}</h2>
      <img
        src={props.image.medium}
        alt={`${props.name}`}
        aria-hidden
        loading="lazy"
        width="250"
        height="140"
      />
      <p>
        Season: {props.season}, Number: {props.episodeNumber}
      </p>
    </section>
  );
}
