import { For, JSX, createSignal } from "solid-js";
import styles from "./tabs.module.css";

type Tab = {
  title: string;
  content: JSX.Element;
};

type Props = {
  tabs: Tab[];
};

export function Tabs(props: Props) {
  const [selectedTab, setSelectedTab] = createSignal(0);

  const createHandleSelectTab = (tabIndex: number) => () =>
    setSelectedTab(tabIndex);

  return (
    <>
      <ul class={styles.tabItems}>
        <For each={props.tabs}>
          {(tab, index) => (
            <li>
              <button
                class={selectedTab() === index() ? styles.active : ""}
                onClick={createHandleSelectTab(index())}
              >
                {tab.title}
              </button>
            </li>
          )}
        </For>
      </ul>
      {props.tabs[selectedTab()].content}
    </>
  );
}
