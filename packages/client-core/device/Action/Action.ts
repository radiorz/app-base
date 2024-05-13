export type ActionHandler<Device> = (device: Device, ...args: any[]) => unknown;
export type ActionName = string;
// 动作系统
// 也就是被触发什么事件
export class Action<Device> {
  constructor(private device: Device) {}
  actions: Map<ActionName, ActionHandler<Device>> = new Map();
  do(actionName: ActionName, data: any) {
    const handler = this.get(actionName);
    if (!handler) {
      return;
    }
    return handler(this.device, data);
  }
  list() {
    return [...this.actions];
  }
  get(actionName: ActionName) {
    return this.actions.get(actionName);
  }
  set(actionName: ActionName, handler: ActionHandler<Device>) {
    return this.actions.set(actionName, handler);
  }
  delete(actionName: ActionName) {
    this.actions.delete(actionName);
  }
}
