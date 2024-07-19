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

export interface LocalStorageSourceOptions {
  key: string;
}
export const DEFAULT_LOCAL_STORAGE_SOURCE_OPTIONS = {
  key: "config",
};
export class LocalStorageSource implements ConfigSource {
  options: LocalStorageSourceOptions;
  constructor(options?: Partial<LocalStorageSourceOptions>) {
    this.options = Object.assign(DEFAULT_LOCAL_STORAGE_SOURCE_OPTIONS, options);
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
  save(config: Record<string, any>) {
    localStorage.setItem("config", JSON.stringify(config));
  }
}
