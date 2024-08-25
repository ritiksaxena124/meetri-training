import "./App.css";
import Image from "./Frame.svg";
import { useState } from "react";

export const App = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <h1>React TS - Counter App</h1>
      <button onClick={() => setCount(count + 1)}>Count -  {count}</button>
      <img src={Image} width={400} height={300} />
    </>
  );
};
