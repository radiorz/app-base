export interface IMessageClient<Topic, MessageObject, Message> {
  connect: Function;
  disconnect: Function;
  onStatus: Function;

  // 将消息发布到指定的主题或频道。
  publish: (topic: Topic, message: Message) => void;

  // 订阅指定的主题或频道。
  subscribe: (topic: Topic) => void;
  // 取消对指定主题的订阅。
  unsubscribe: (topic: Topic) => void;
  // 处理接收到的消息的回调方法。
  _onMessage: (message: Message) => void;

  _decodeMessage: (message: any) => MessageObject;
  _encodeMessage: (messageObject: MessageObject) => Message;
}

export interface IFetcher<Request, Response> {
  fetch: (request: Request) => Response;
}

export interface IResource<Resource> {
  init?: Function; // 可能预加载一些东西
  create: (data: Resource) => Resource; // 包括 validation
  batchCreate: (data: Resource[]) => Resource[];
  remove: (id: any) => boolean;
  batchRemove: (data: Resource[]) => Resource[];
  update: (id: any, data: Resource[]) => boolean;
  batchUpdate: (data: Resource[]) => Resource[];
  find: (id: any) => Resource | null;
  batchFind: (query: any) => Resource[]; // 列出 包括 list/query/sort/pagination/filter/counting
  tree?: Function;
  export: () => Resource[];
  import: () => Resource[];
  // 跟踪
  onTrack: Function;
}
export interface IService {
  init: () => void;
  load: () => void;
}
// 客户端
export interface IClient extends OnInit, OnDestroy {}
export interface OnInit {
  init(): any;
}
export interface OnDestroy {
  destroy(): any;
}

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

export class Store {}

export class Client implements OnInit, OnDestroy {
  id: string = "";
  init() {}
  destroy() {}
  onServiceReady() {}
  run() {}
  // 退出界面
  onExit() {}
  onError() {}
}

export class ParentChildManager<Device extends Client> {
  parent: Device | null = null;
  constructor(private store: Store) {}
  children: Map<string, Device> = new Map();
  getChildren() {
    return [...this.children];
  }
  setChild(device: Device) {
    this.children.set(device.id, device);
  }
  removeChild(id: string) {
    const child = this.children.delete(id);
  }
  setParent(device: Device) {
    this.parent = device;
    // 提示设置父亲成功
  }
  removeFromParent() {}
}
