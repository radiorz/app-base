import {
  WsAdapter,
  ProtocolImpl,
  Protocol,
  Adapter,
  Message,
  ProtocolOptions,
} from "../lib";

class VoerkaProtocol implements Protocol {
  name: string = "";
  adapter: Adapter;
  constructor(opts: ProtocolOptions) {
    this.adapter = opts.adapter;
  }
  buildMessage(originMessage: any): Message {
    throw new Error("Method not implemented.");
  }
  buildAttrUpdate(): Message {
    throw new Error("Method not implemented.");
  }
  buildAlarm(): Message {
    throw new Error("Method not implemented.");
  }
  buildEvent(): Message {
    throw new Error("Method not implemented.");
  }
  sendMessage(message: Message): boolean {
    throw new Error("Method not implemented.");
  }
  addAdapter(adapter: Adapter): void {
    throw new Error("Method not implemented.");
  }
  onMessage(callback: any): void {
    throw new Error("Method not implemented.");
  }
}
// 使用
const adapter = new WsAdapter();
const protocol = new VoerkaProtocol({ adapter });
protocol.onMessage((message: any) => {
  console.log(`message`, message);
});
const message = protocol.buildMessage({ hahaha: 123 });
protocol.sendMessage(message);
