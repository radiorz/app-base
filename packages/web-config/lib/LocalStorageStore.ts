import { optionsMerge } from "@tikkhun/utils-core";
// import { ConfigStorage } from "@tikkhun/config-core";
interface ConfigStorage {
  get(): Record<string, any>;
  set(config: Record<string, any>): void;
}

export class LocalStorageStore implements ConfigStorage {
  static defaultOptions = {
    key: "config",
  };
  options: typeof LocalStorageStore.defaultOptions;
  constructor(options: Partial<typeof LocalStorageStore.defaultOptions>) {
    this.options = optionsMerge(LocalStorageStore.defaultOptions, options);
  }
  get() {
    try {
      const item = localStorage.getItem(this.options.key) as any;
      if (!item) return item;
      return JSON.parse(item);
    } catch (error: any) {
      console.warn("加载localstorage配置,但报错,原因为", error.message);
      return {};
    }
  }
  set(config: any) {
    localStorage.setItem(this.options.key, JSON.stringify(config));
  }
}
