import axios from "axios";
import { get, merge, set } from "lodash";
import { Api, GetOptions, RemoveOptions, SetOptions } from "./Api";
export interface GetTokenOptions {
  username: string;
  password: string;
}
export class RemoteStore {
  request: any;
  constructor() {}
  async getToken({ username, password }: GetTokenOptions) {
    const result = await this.request.post("/login", {
      username,
      password,
    });
    return result.data.payload.token;
  }
}

class LocalStore implements Api {
  store: Record<string, any> = {};
  constructor() {}
  get(path: string): any;
  get(options?: Partial<GetOptions>): any;
  get(options?: string | Partial<GetOptions>): any {
    let path = "";
    if (typeof options === "string") {
      path = options;
    } else {
      path = options?.path || "";
    }
    return get(this.store, path);
  }
  set(path: string, data: any): any;
  set(options?: Partial<SetOptions>): any;
  set(first?: unknown, second?: unknown): any {
    let options: any = {};
    if (typeof first === "string") {
      options = { path: first, data: second };
    } else {
      options = options;
    }
    const { path, data } = options || {};
    set(this.store, path, data);
  }
  remove(path: string): any;
  remove(options?: Partial<RemoveOptions>): any;
  remove(first?: string | Partial<RemoveOptions>) {
    if (typeof first === "string") {
      return this.set(first, undefined);
    } else {
      return this.set({ ...first, data: undefined });
    }
  }
}
interface AuthOptions {
  localStore: LocalStore;
  remoteStore: RemoteStore;
  username: string;
  password: string;
}
function getAuthDefaultOptions() {
  return {
    localStore: new LocalStore(),
    remoteStore: new RemoteStore(),
    username: "",
    password: "",
  };
}
export class Auth {
  static TOKEN_KEY = "token";
  options: AuthOptions;
  constructor(options?: Partial<AuthOptions>) {
    this.options = merge(getAuthDefaultOptions(), options);
  }
  async init(request: Request) {
    this.options.remoteStore.request = request;
    await this.getToken();
  }
  async getToken() {
    let token = this.options.localStore.get(Auth.TOKEN_KEY);
    if (token) {
      return token;
    }
    const { username, password } = this.options;
    token = await this.refreshToken({ username, password });
    return token;
  }
  async refreshToken({ username, password }: GetTokenOptions) {
    let token = await this.options.remoteStore.getToken({ username, password });
    this.options.localStore.set(Auth.TOKEN_KEY, token);
    return token;
  }
  removeToken() {
    return this.options.localStore.remove(Auth.TOKEN_KEY);
  }
  isTokenNotNeed(config: any) {
    return config.url === "/login" || config.url === "login";
  }
  // intercepter
  async withRequestToken(config: any) {
    if (this.isTokenNotNeed(config)) {
      return config;
    }
    // 这里要忽略登录
    let token = await this.getToken();
    if (token) {
      config.headers["X-Token"] = token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }
}
class FetchStategy {
  // static retry(func, times) {}
}
export interface AxiosOptions {
  baseURL: string;
  timeout: number;
  headers: any;
}
export interface RetryStrategy {}
export interface ResourceProtocal {
  // 增删改查
}
export interface RequestOptions extends Partial<AxiosOptions> {
  auth: Auth;
  retryStrategy: RetryStrategy;
  resourceProtocol: ResourceProtocal;
}
function getRequestDefaultOptions() {
  return {
    baseURL: "",
    timeout: 10 * 1000,
    headers: {},
    auth: null,
    retryStrategy: null,
    resourceProtocol: null,
  };
}
export class Request {
  instance: any;
  // 方法代理
  request: any;
  get: any;
  post: any;
  delete: any;
  head: any;
  put: any;
  patch: any;
  options: any;
  opts: RequestOptions;
  auth?: Auth;
  retryStrategy?: RetryStrategy;
  resourceProtocal?: ResourceProtocal;
  constructor(options?: Partial<RequestOptions>) {
    this.opts = merge(getRequestDefaultOptions(), options);
    const { auth, retryStrategy, resourceProtocol, ...axiosOptions } =
      this.opts;
    // init
    this.instance = axios.create(axiosOptions);
    if (auth) {
      this.auth = auth;
      this.instance.interceptors.request.use(
        this.auth.withRequestToken.bind(this.auth)
      );
    }
    this.instance.interceptors.response.use([
      this.withResponseSuccess.bind(this),
      this.withResponseError.bind(this),
    ]);
    // 方法代理
    this.request = this.instance.request;
    this.get = this.instance.get;
    this.post = this.instance.post;
    this.delete = this.instance.delete;
    this.head = this.instance.head;
    this.put = this.instance.put;
    this.patch = this.instance.patch;
    this.options = this.instance.options;
  }
  async init() {
    if (this.auth) {
      await this.auth.init(this);
    }
  }

  isResponseRight(response: any) {
    const { status } = response || {};
    if (status === 201 || status === 200) {
      return true;
    } else {
      return false;
    }
  }
  withResponseSuccess(response: any) {
    if (this.isResponseRight(response)) {
      return response.data;
    } else {
      return Promise.reject(response);
    }
  }
  withResponseError(error: any) {
    if (this.isAuthError(error)) {
      return {
        error: "AUTH_ERROR",
      };
    }
    return error;
  }
  isAuthError(error: any) {
    if (error?.response?.status === 403) {
      return true;
    }
    return false;
  }
}

// TODO 重试策略
// TODO 资源管理
// 这个或许得看一下alova 了
// 怎么使用洋葱模型来工作？因为其实后端框架也是一层一层下去然后一层一层上来，最终获取数据，我想客户端也一样。
