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
  
  _decodeMessage: (message) => MessageObject;
  _encodeMessage: (messageObject: MessageObject) => Message;
}

export interface IFetcher<Request, Response> {
  fetch: (request: Request) => Response;
}

export interface IResource<Resource> {
  init: Function;
  create: (data: Resource) => Resource; // 包括 validation
  batchCreate: (data: Resource[]) => Resource[];
  remove: (id) => boolean;
  batchRemove: (data: Resource[]) => Resource[];
  update: (id, data) => boolean;
  batchUpdate: (data: Resource[]) => Resource[];
  get: (id) => Resource | null;
  list: (query) => Resource[]; // 列出 包括 list/query/sort/pagination/filter/counting
  tree?: Function;
  // export
  // import
  // 跟踪
  onTrack: Function;
}
