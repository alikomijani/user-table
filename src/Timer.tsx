import { useEffect, useRef, useState } from "react";

type Props = {};

function Timer({}: Props) {
  const [speed, setSpeed] = useState(1000);
  const [countDown, setCountDown] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (start) {
      ref.current = setInterval(() => {
        setCountDown((prevState) => prevState + 1);
      }, speed);
    }
    return () => {
      clearInterval(ref.current);
    };
  }, [start, speed]);

  useEffect(() => {
    const log = () => {
      console.log("click");
    };
    document.body.addEventListener("click", log);

    return () => {
      document.body.removeEventListener("click", log);
    };
  }, []);

  return (
    <div className="w-1/2 mx-auto mt-4">
      <input className="border " ref={inputRef} />
      <div>{countDown}</div>
      <div className="flex gap-2 mt-3">
        <button onClick={() => setStart(true)} className="p-2 bg-blue-300">
          Start
        </button>
        <button onClick={() => setStart(false)} className="p-2 bg-blue-300">
          Pause
        </button>
        <button
          onClick={() => {
            setCountDown(0);
            setStart(false);
          }}
          className="p-2 bg-blue-300"
        >
          Stop
        </button>
        <button
          onClick={() => {
            setSpeed((prev) => prev + 100);
          }}
          className="p-2 bg-blue-300"
        >
          speed up
        </button>
        <button
          onClick={() => {
            setSpeed((prev) => prev - 100);
          }}
          className="p-2 bg-blue-300"
        >
          speed down
        </button>
      </div>
    </div>
  );
}

export default Timer;
