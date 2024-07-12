export interface ResourceProtocol {
  findOne(): void;
  findTree(): void;
}
// 目前的常见请求包括了 http/graphql/ 其他消息自创
export interface RequestAdapter {
  // query
  get: any;
  // mutation
  set: any;
  post: any;
  delete: any;
  // status
  options: any;
  init(): void;
}
import axios from "axios";
class AxiosRequestAdapter {}
export interface AuthProtocol {
  // 包装请求器 request response 包装
  withAuth(adapter: RequestAdapter): void;
  refresh(): void; // 刷新认证
  init(adapter: RequestAdapter): void; // 初始化
}

export interface RetryProtocol {
  retryTimes: number;
  shouldRetry(): boolean;
}
export interface RequestOpts {
  auth: AuthProtocol;
  retry: RetryProtocol;
  adapter: RequestAdapter;
}
export class Request {
  auth: AuthProtocol;
  retry: RetryProtocol;
  adapter: RequestAdapter;
  constructor(opts: RequestOpts) {
    this.auth = opts.auth;
    this.retry = opts.retry;
    this.adapter = opts.adapter;
  }
  init() {
    this.adapter.init();
    this.auth.init();
  }
  request(opts: RequestMethodOptions) {
    const result = this.retry.do(this.adapter.request, opts);
  }
}

const adapter = axios;
const auth = new Auth({ adapter });
const result = new Request().use(auth).use(tracker).request();
