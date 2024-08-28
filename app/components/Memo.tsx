"use client";

import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import "./memo.scss";

export const Memo = () => {
  const [count, setCount] = useState(0);
  // const double = (count: number) => {
  //   let i = 0;
  //   while (i < 100000000) i++;
  //   return count * 2;
  // };
  // const doubleCount =  useMemo(() => {
  //   return double(count)
  // }, [count])

  const Child1 = React.memo((props: { handleClick: () => void }) => {
    return (
      <>
        <div>子コンポーネント１</div>
        <button onClick={props.handleClick}></button>
      </>
    );
  });
  const Child2 = () => {
    return <div>子コンポーネント2</div>;
  };

  const handleClick = useCallback(() => {
    console.log("click");
  }, [])

  const [text, setText] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div className="main">
      <div>Memo</div>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        value={text}
        className="border-2 border-slate-200 rounded-md"
      />
      <Child1 handleClick={handleClick} />
      <Child2 />
      {/* <p>重い処理</p>
      <p>
        Counter: {count}, {doubleCount}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button> */}
    </div>
  );
};
