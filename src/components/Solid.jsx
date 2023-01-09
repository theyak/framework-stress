import { Index, onMount, createSignal, createMemo, batch } from "solid-js";

const endAt = Date.now() + 10000;
const token = () => Math.random().toString(36).substring(2, 10);
const initialList = [];
for (let i = 0; i < 500; i++) {
  initialList.push({ name: token(), id: i });
}
const [list, setList] = createSignal(initialList);
const [count, setCount] = createSignal(0);

const lots = [...Array(30000).keys()];

const List = createMemo(function () {
  return (
    <div>
      <For each={lots}>
        {(i) => {
          return <div>{i}</div>;
        }}
      </For>
    </div>
  );
});

function Solid(props) {
  onMount(() => {
    const go = () => {
      const newList = [];
      for (let i = 0; i < 500; i++) {
        newList.push({ name: token, id: i });
      }

      batch(() => {
        setList(newList);
        setCount((c) => c + 1);
      });

      if (Date.now() < endAt) {
        setTimeout(() => go(), 1);
      }
    };

    go();
  });

  return (
    <>
      <h1>SolidJS ({count()})</h1>
      <ul>
        <Index each={list()}>
          {(item, i) => {
            return <li>{item().name}</li>;
          }}
        </Index>
      </ul>
      {props.longList && <List />}
    </>
  );
}

export default Solid;
