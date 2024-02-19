/**
 * @author
 * @file useInterval.js
 * @fileBase useInterval
 * @path packages\react-hooks\useInterval.js
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */

import { useState, useEffect, useCallback } from "react";
// import { useDispatch } from "react-redux";
import { isNumber } from "@tikkhun/functions";
export default function useInterval(
  callback,
  interval = 1000,
  { immediate = false }
) {
  const intervalIdRef = useRef(null);
  // 清除函数
  const clear = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  }, []);
  // 定时逻辑
  useEffect(() => {
    // 判断传入参数是否正确
    if (!isNumber(interval) || interval < 0) {
      // 开发模式下就报错
      if(isDev){
        console.error(`useInterval interval is not correct`, interval);
      }
      return;
    }
    // 立即执行
    if (immediate) {
      callback();
    }
    // 定时执行
    intervalIdRef.current = setInterval(() => {
      callback();
    }, interval);

    return clear;
  }, [interval, immediate]);
  // 返回清除函数
  return { clear };
}
