import React, { useEffect, useState, useCallback } from "react";

let endAt = Date.now() + 10000;
const token = () => Math.random().toString(36).substring(2, 10);
const lots = [...Array(30000).keys()];
let running = true;
let timeout = null;

const getTokenList = () => {
  const tokens = [];
  for (let i = 0; i < 500; i++) {
    tokens.push({ name: token(), id: i });
  }
  return tokens;
};
const initialList = getTokenList();

const ListingMemoized = React.memo(() => (
  <>
    <div>Memoized</div>
    {lots.map((i, j) => {
      return <div key={i}>{i}</div>;
    })}
  </>
));

const Listing = () => (
  <>
    <div>Not Memoized</div>
    {lots.map((i, j) => {
      return <div key={i}>{i}</div>;
    })}
  </>
);

const go = (setList, setCounter) => {
  setList(getTokenList());
  setCounter((c) => c + 1);

  if (Date.now() < endAt) {
    timeout = setTimeout(() => go(setList, setCounter), 1);
  } else {
    clearTimeout(timeout);
    timeout = null;
  }
};

function onRun(setList, setCounter) {
  setCounter(0);
  if (timeout) {
    clearTimeout(timeout);
  }
  endAt = Date.now() + 10000;
  timeout = setTimeout(() => go(setList, setCounter));
}


function App({ longList }) {
  const [list, setList] = useState(initialList);
  const [count, setCounter] = useState(0);
  const [memo, setMemo] = useState(false);

  const onMemo = (e) => setMemo(e.target.checked);

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
      <button style={{ marginBottom: "1em" }} onClick={() => onRun(setList, setCounter)}>
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
