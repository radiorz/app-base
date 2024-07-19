import { Config } from "@tikkhun/config-core";
import { LocalStorageSource } from "./LocalStorageSource";
export const DEFAULT_CONFIG_MANAGER = Config.create({
  sources: [new LocalStorageSource()],
});
