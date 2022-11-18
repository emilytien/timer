import "./App.css";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const TimerST = styled.div`
  font-size: 50px;
  margin: 10px;
  text-align: center;
`;

const BtnST = styled.div`
  text-align: center;
`;

const Button = styled.button`
  font-size: 20px;
  &:hover {
    color: red;
  }
  & + & {
    margin-left: 10px;
  }
`;

const ClockST = styled.div`
  text-align: center;
  font-size: 100px;
  margin: 10px;
`;

export default function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  const counter = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    if (start) {
      ref.current = setInterval(counter, 1000);
    }
    return () => {
      clearInterval(ref.current);
    };
  }, [start]);

  return (
    <>
      <Timer />
      <div>
        <Clock count={count} />
      </div>
      <Btn setStart={setStart} setCount={setCount} />
    </>
  );
}

function Btn({ setStart, setCount }) {
  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
  };

  const handleclear = () => {
    setStart(false);
    setCount(0);
  };

  return (
    <BtnST>
      <Button onClick={handleStart}>開始</Button>
      <Button onClick={handleStop}>暫停</Button>
      <Button onClick={handleclear}>重設</Button>
    </BtnST>
  );
}

function Timer() {
  return <TimerST>計時器</TimerST>;
}

const Clock = ({ count }) => {
  const hour = formatTime(Math.floor(count / (60 * 60)) % 24);
  const min = formatTime(Math.floor(count / 60) % 60);
  const sec = formatTime(count % 60);

  return <ClockST>{`${hour}:${min}:${sec}`}</ClockST>;
};

const formatTime = (time) => {
  return time.toString().length === 1 ? `0${time}` : time;
};
