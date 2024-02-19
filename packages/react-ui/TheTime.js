import React, { useState, useEffect } from "react";

const TimeComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Current Time:</h1>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default TimeComponent;
