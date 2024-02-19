/**
 * @author
 * @file useTime.js
 * @fileBase useTime
 * @path packages\react-hooks\useTime.js
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */

import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";

export default function useTime(interval) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return { currentTime };
}
