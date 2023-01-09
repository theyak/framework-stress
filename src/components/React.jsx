import React, { useEffect, useState, useCallback } from "react";

let endAt = Date.now() + 10000;
const token = () => Math.random().toString(36).substring(2, 10);
const lots = [...Array(30000).keys()];
let running = true;
let timeout = null;

const initialList = [];
for (let i = 0; i < 500; i++) {
  initialList.push({ name: token(), id: i });
}

const ListingMemoized = React.memo(() => (
  <div>
    <div>Memoized</div>
    {lots.map((i, j) => {
      return <div key={i}>{i}</div>;
    })}
  </div>
));

const Listing = () => (
  <div>
    <div>Not Memoized</div>
    {lots.map((i, j) => {
      return <div key={i}>{i}</div>;
    })}
  </div>
);

function App({ longList }) {
  const [list, setList] = useState(initialList);
  const [count, setCounter] = useState(0);
  const [memo, setMemo] = useState(false);

  const onMemo = useCallback((e) => {
    setMemo(e.target.checked);
  }, []);

  const onRun = useCallback((e) => {
    setCounter(0);
    if (timeout) {
      clearTimeout(timeout);
    }
    endAt = Date.now() + 10000;
    timeout = setTimeout(go, 1);
  }, []);

  const go = () => {
    const newList = [...list];
    newList.forEach((item, i) => {
      item.name = token();
    });
    setList(newList);
    setCounter((c) => c + 1);

    if (Date.now() < endAt) {
      timeout = setTimeout(go, 1);
    } else {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return (
    <>
      <h1>
        React v{React.version} ({count})
      </h1>
      <div style={{ marginBottom: "1em" }}>
        <label style={{ cursor: "pointer" }}>
          <input type="checkbox" onChange={onMemo}></input>
          Use Memo
        </label>
      </div>
      <button style={{ marginBottom: "1em" }} onClick={onRun}>
        Run!
      </button>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {memo ? <ListingMemoized /> : <Listing />}
    </>
  );
}

export default App;
