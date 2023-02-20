import React, { useEffect, useRef, useState } from "react";

type BtnProps = {
  setStart: (value: boolean) => void;
  setCount: (value: number) => void;
};

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef<NodeJS.Timer | null>(null);

  const counter = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    if (start) {
      ref.current = setInterval(counter, 1000);
    }
    return () => {
      clearInterval(ref.current as NodeJS.Timer);
    };
  }, [start]);

  return (
    <div className="flex items-center justify-center  w-screen h-screen bg-violet-200">
      <div className="w-64  text-center font-mono bg-rose-600 border-2 border-rose-700 rounded-3xl shadow-xl">
        <div className="py-4 text-lg">Timer</div>
        <div>
          <Clock count={count} />
        </div>
        <Btn setStart={setStart} setCount={setCount} />
      </div>
    </div>
  );
};

const Btn: React.FC<BtnProps> = ({ setStart, setCount }) => {
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
    <div className="grid grid-cols-3 gap-5 p-4">
      <div>
        <button onClick={handleStart} className="btn"></button>
        <div>START</div>
      </div>
      <div>
        <button onClick={handleStop} className="btn"></button>
        <div>PAUSE</div>
      </div>
      <div>
        <button onClick={handleclear} className="btn"></button>
        <div>RESET</div>
      </div>
    </div>
  );
};

const Clock: React.FC<{ count: number }> = ({ count }: { count: number }) => {
  const hour = formatTime(Math.floor(count / (60 * 60)) % 24);
  const min = formatTime(Math.floor(count / 60) % 60);
  const sec = formatTime(count % 60);

  return (
    <div className="m-auto w-40 border-2 border-neutral-600 rounded bg-neutral-400">
      <div className="text-3xl text-neutral-800">{`${hour}:${min}:${sec}`}</div>
    </div>
  );
};

const formatTime = (time: number) => {
  return time.toString().length === 1 ? `0${time}` : time;
};

export default App;
