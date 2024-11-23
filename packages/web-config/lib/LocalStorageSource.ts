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
import { optionsMerge } from "@tikkhun/utils-core";
import { debounce } from "lodash-es";

export class LocalStorageSource implements ConfigSource {
  static defaultOptions = {
    // 存储的键值对
    key: "config",
    // 存储的
    saveDebounce: 200,
    emitError: true,
  };
  options: typeof LocalStorageSource.defaultOptions;
  constructor(options?: Partial<typeof LocalStorageSource.defaultOptions>) {
    this.options = optionsMerge(LocalStorageSource.defaultOptions, options);
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
      if (this.options.emitError) throw error;
      return null;
    }
  }
  // 这里应该搞个debounce
  save(config: Record<string, any>) {
    localStorage.setItem(this.options.key, JSON.stringify(config));
  }
}
