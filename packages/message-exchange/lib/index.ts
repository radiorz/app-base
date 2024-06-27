export interface Message {}
export interface SenderProtocol {
  adapter: Adapter;
  name: string;
  buildMessage(originMessage: any): Message;
  // 快捷方法
  buildAttrUpdate?(): Message;
  buildAlarm?(): Message;
  buildEvent?(): Message;
  buildBroadcast?(): Message;
  buildAction?(): Message;
  sendMessage(message: Message): boolean;
  addAdapter(adapter: Adapter): void;
}
// 认证这种一般是 adapter 的附属物
export interface AuthProtocol {
  init(): void;
  refresh(): void;
}

export interface ReceiverProtocol {
  name: string;
  adapter: Adapter;
  onMessage(callback: any): void;
}

export interface Protocol extends SenderProtocol, ReceiverProtocol {
  name: string;
}
export interface Tracker {
  onMessage(message: any): void;
}
export interface SenderOptions {
  adapter: Adapter;
  protocols: Protocol[];
  tracker: Tracker;
}
export interface SenderAdapter {
  send(message: any): boolean;
}
export interface ReceiverAdapter {
  onMessage(callback: any): void;
}
export interface Adapter extends SenderAdapter, ReceiverAdapter {}

// 使用
export class AdapterImpl implements Adapter {
  send(message: any): boolean {
    throw new Error("Method not implemented.");
  }
  onMessage(callback: any): void {
    throw new Error("Method not implemented.");
  }
}
export interface ProtocolOptions {
  adapter: Adapter;
}
export class ProtocolImpl implements Protocol {
  adapter: Adapter;
  constructor(opts: ProtocolOptions) {
    this.adapter = opts.adapter;
  }
  sendMessage(message: Message): boolean {
    return this.adapter.send(message);
  }
  onMessage(callback: any): void {
    throw new Error("Method not implemented.");
  }
  buildMessage(message: any): Message {
    return { ...message };
  }
  addAdapter(adapter: Adapter): void {
    this.adapter = adapter;
  }
  name: string = "";
}

export class WsAdapter implements Adapter {
  send(message: any): boolean {
    throw new Error("Method not implemented.");
  }
  onMessage(callback: any): void {
    throw new Error("Method not implemented.");
  }
  name: string = "WsAdapter";
}
