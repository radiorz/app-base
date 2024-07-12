import { Logger } from "@tikkhun/logger";
export class CrashDaemon {
  logger = new Logger("CrashDaemon");
  constructor() {}
  start() {
    window.onerror = this.onWindowError.bind(this);
  }
  stop() {
    window.onerror = () => {};
  }
  onWindowError(
    message: any,
    url: any,
    lineNo: any,
    columnNo: any,
    error: any
  ) {
    this.logger.error!(`!!!系统级错误 `, message, url, lineNo, columnNo, error);
  }
}
