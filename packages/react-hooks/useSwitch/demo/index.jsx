/**
 * @author
 * @file index.jsx
 * @fileBase SwitchCase
 * @path packages\react-antd-js\src\views\SwitchCase\index.jsx
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */
import { useSwitch } from "../index";
function SwitchCase() {
  const cases = new Set([1, 2, 3]);
  const { currentCase, setCase, setNextCase, setPrevCase, setRandomCase } =
    useSwitch(cases, 1);
  return (
    <div>
      SwitchCase:
      {currentCase}
      <button onClick={() => setCase(1)}>1</button>
      <button onClick={() => setCase(2)}>2</button>
      <button onClick={() => setCase(3)}>3</button>
      <button onClick={() => setNextCase()}>next</button>
      <button onClick={() => setPrevCase()}>prev</button>
      <button onClick={() => setRandomCase()}>random</button>
    </div>
  );
}

export default SwitchCase;
