/**
 * @author
 * @file LocalStorageSource.ts
 * @fileBase LocalStorageSource
 * @path packages\config\lib\LocalStorageSource.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */

import { ConfigSource } from "@tikkhun/config-core";
import { debounce } from "lodash-es";
export interface LocalStorageSourceOptions {
  key: string;
  saveDebounce: number;
}
export const DEFAULT_LOCAL_STORAGE_SOURCE_OPTIONS = {
  key: "config",
  saveDebounce: 200,
};
export class LocalStorageSource implements ConfigSource {
  options: LocalStorageSourceOptions;
  constructor(options?: Partial<LocalStorageSourceOptions>) {
    this.options = Object.assign(DEFAULT_LOCAL_STORAGE_SOURCE_OPTIONS, options);
    this.save = debounce(this.save.bind(this), this.options.saveDebounce);
  }
  load() {
    try {
      const config = localStorage.getItem(this.options.key);
      if (!config) {
        throw new Error("config is not defined");
      }
      return JSON.parse(config);
    } catch (error) {
      return {};
    }
  }
  // 这里应该搞个debounce
  save(config: Record<string, any>) {
    localStorage.setItem("config", JSON.stringify(config));
  }
}
