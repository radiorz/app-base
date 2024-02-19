/**
 * @author
 * @file useMount.js
 * @fileBase useMount
 * @path packages\react-hooks\useMount.js
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

export default function useMount(fn) {
  useEffect(() => {
    fn();
  }, []);
}
