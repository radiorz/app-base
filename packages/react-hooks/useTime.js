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
import { useInterval } from "./useInterval";
export default function useTime({ interval = 500 }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  useInterval(() => {
    setCurrentTime(new Date());
  }, interval);
  return { currentTime };
}
