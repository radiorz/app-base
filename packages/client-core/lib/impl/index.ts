// device 最重要的就是书写生命周期 管理服务
export interface LifeCycle {
  onInit: () => void;
}
class Service {
  constructor() {}
  onInit() {}
}
class DbService extends Service {}
class MemoryDbService {}
class MessageManager {
  getStatus() {}
  send() {}
  on() {}
}
class ReqeustManager {}
class ResourceProtocal {
  onChange() {}
}
class ServiceManager {}
interface DoOptions {
  actionName: string;
  payload: any;
}
interface ActionProxy {
  do(options: DoOptions): any;
}

export class Client extends ServiceManager implements ActionProxy {
  init() {}
  do(options: DoOptions) {
    const { actionName, payload } = options;
  }
}
