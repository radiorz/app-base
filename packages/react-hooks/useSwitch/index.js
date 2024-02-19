/**
 * @author
 * @file useSwitch.js
 * @fileBase useSwitch
 * @path packages\react-hooks\useSwitch.js
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */
/**
 * @alpha
 */
import { useState } from "react";

export default function useSwitch(cases = new Set(), defaultCase) {
  const caseArray = Array.from(cases);
  const [currentCase, setCurrentCase] = useState(defaultCase || caseArray[0]);

  function setRandomCase() {
    const randomIndex = Math.floor(Math.random() * caseArray.length);
    setCurrentCase(caseArray[randomIndex]);
  }

  function setNextCase() {
    const currentIndex = caseArray.indexOf(currentCase);
    const nextIndex = (currentIndex + 1) % caseArray.length;
    setCurrentCase(caseArray[nextIndex]);
  }

  function setPrevCase() {
    const currentIndex = caseArray.indexOf(currentCase);
    const prevIndex = (currentIndex - 1 + caseArray.length) % caseArray.length;
    setCurrentCase(caseArray[prevIndex]);
  }

  function setCase(caseValue) {
    if (cases.has(caseValue)) {
      setCurrentCase(caseValue);
    }
  }

  return {
    currentCase,
    setRandomCase,
    setNextCase,
    setPrevCase,
    setCase,
  };
}
