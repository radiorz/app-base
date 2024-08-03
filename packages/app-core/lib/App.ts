/**
 * @author
 * @file App.ts
 * @fileBase App
 * @path packages\app-core\lib\App.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */
import {
  LifeCycle,
  LifeCycleManager,
  LifeCycleOptions,
} from "./LifeCycleManager";
import { ModuleManager, ModuleOptions } from "./ModuleManager";

export interface App_Options {
  moduleOptions?: Partial<ModuleOptions>;
  lifeCycleOptions?: Partial<LifeCycleOptions>;
}
export const DEFAULT_APP_OPTIONS: App_Options = {};
export class App implements LifeCycle {
  options: App_Options;
  moduleManager: ModuleManager;
  lifeCycleManager: LifeCycleManager;
  constructor(options?: Partial<App_Options>) {
    this.options = Object.assign(DEFAULT_APP_OPTIONS, options);
    this.moduleManager = new ModuleManager(this.options.moduleOptions);
    this.lifeCycleManager = new LifeCycleManager(this.options.lifeCycleOptions);
  }
  init(): void {
    this.configManager.init();
  }
  start(): void {
    throw new Error("Method not implemented.");
  }
  stop(): void {
    throw new Error("Method not implemented.");
  }
}
