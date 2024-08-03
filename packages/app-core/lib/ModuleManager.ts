/**
 * @author
 * @file ModuleManager.ts
 * @fileBase ModuleManager
 * @path packages\app-core\lib\ModuleManager.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */

export interface ModuleOptions {}
export const DEFAULT_MODULE_OPTIONS = {};
export class ModuleManager {
  options: ModuleOptions;
  constructor(options?: Partial<ModuleOptions>) {
    this.options = Object.assign(DEFAULT_MODULE_OPTIONS, options);
  }
}
