import { LifeCycle } from "./App";
import { merge } from "lodash";
/**
 * @author
 * @file LifeCycleManager.ts
 * @fileBase LifeCycleManager
 * @path packages\app-core\lib\LifeCycleManager.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */
export interface LifeCycle {
  init(): void;
  start(): void;
  stop(): void;
}
export interface LifeCycleOptions {}
export const DEFAULT_LIFE_CYCLE_OPTIONS: LifeCycleOptions = {};
// 用来注册生命周期
// 触发生命周期
const cycles = {
  created: "created",
  beforeStarted: "beforeStarted",
  starting: "starting",
  started: "started",
};
export class LifeCycleManager {
  cycles = new Map<string, any>();
  options: LifeCycleOptions;
  constructor(options?: Partial<LifeCycleOptions>) {
    this.options = merge(DEFAULT_LIFE_CYCLE_OPTIONS, options);
  }
  // 注册生命周期钩子函数
  register(name: string, callback: () => void) {
    if (!this.cycles.has(name)) {
      this.cycles.set(name, callback);
    }
  }
  // 触发生命周期钩子函数
  trigger(name: string) {
    if (this.cycles.has(name)) {
      this.cycles.get(name);
    }
  }
}
