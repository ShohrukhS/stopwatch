import { useState, useEffect } from 'react';


const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const stop = () => {
    setIsRunning(false);
  }

  const resetting = () => {
    setTime(0);
    setIsRunning(false);
  }

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div>
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>Start</button>
        <button onClick={stop}
          className={isRunning ? 'stop-button active' : 'stop-button'}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button onClick={resetting}>Reset</button>
      </div>
    </div>
  );
};
// () => { setIsRunning(false); setTime(0); }
export default Stopwatch;