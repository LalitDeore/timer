import React, { useState, useEffect } from "react";
import { MdNotStarted, MdPause } from "react-icons/md";
import { RxReset } from "react-icons/rx";
import "./style.css";

const Timer = () => {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let totalSeconds = inputMinutes * 60;
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds -= 1;
          setTime((prevTime) => ({
            hours: Math.floor(totalSeconds / 3600),
            minutes: Math.floor((totalSeconds % 3600) / 60),
            seconds: totalSeconds % 60,
          }));
        } else {
          clearInterval(timer);
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [inputMinutes, isRunning]);

  const handleInputChange = (event) => {
    const minutes = parseInt(event.target.value, 10);
    setInputMinutes(isNaN(minutes) ? "" : minutes);
  };

  const handleStartStopClick = () => {
    setIsRunning(!isRunning);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setInputMinutes("");
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  return (
    <div className="countdown-timer">
      <label className="input-box">
        <h1 className="text">Enter minutes:</h1>
        <input
          type="number"
          value={inputMinutes}
          onChange={handleInputChange}
          className="input"
        />
      </label>
      <div className="timer-display">
        <button
          className="button"
          style={{ width: "20px", height: "20px" }}
          onClick={handleStartStopClick}
        >
          {isRunning ? (
            <MdPause className="icon text" />
          ) : (
            <MdNotStarted className="icon text" />
          )}
        </button>
        <label className="time">
          {time.hours}h {time.minutes}m {time.seconds}s
        </label>
        <button className="button" onClick={handleResetClick}>
          <RxReset className="icon text" style={{ marginTop: "30px" }} />
        </button>
      </div>
    </div>
  );
};

export default Timer;
