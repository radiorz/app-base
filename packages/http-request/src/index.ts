import { Request, GetTokenOptions } from "../lib/index";
// 这样的设计可能不是那么好 要确定各种策略之间的关系 不然会出现 request 依赖 auth auth 依赖 request 的问题
// auth wrapper
// - localStore
// - remoteStore
//   - request
// retry Wrapper
// -
// resource Wrapper
// - request / request-with-auth
// 可以参考 express 的路由层次
// 一个请求 应该经过多种包装 最后获取到最终的值
// 比如一个请求,首先应该 认证,携带认证信息进行获取,获取可能需要重试,最后转化成想要的值
// 这个链条
// 比如资源请求  首先也是认证 获取可能需要重试或者缓存，
// 就可以写成 [auth,如果有缓存获取缓存，retry(request(auth)),正确就缓存，transform]
// 方便设计的话就是用一个context将链条信息整合起来

interface Status {}
enum RequestType {
  success = "success",
  error = "error",
}
enum ErrorType {
  permission = "permission",
  else = "else",
}
interface RequestResult {
  // http状态码
  statusCode: number | string;
  // 成功还是失败
  type: RequestType;
  // 错误类型
  errorType: ErrorType;
  // 信息
  message: string; // 这个一句话我其实很不喜欢
  // 具体数据
  data: any;
  [props: string]: any;
}
interface Auth {
  // 这里的Auth 以barear为例
  on: boolean;
}
interface RetryOptions {
  maxTimes: number;
  shouldRetry: (result: RequestResult) => boolean;
}
interface HandlerOptions {
  // 这个继承axios
}
interface ResourceOptions {}
interface Context {
  auth: Auth;
  retry: RetryOptions;
  // 这俩选其一即可
  handlerOpts?: HandlerOptions | ResourceOptions;

  results: RequestResult[];
}
interface GetTokenOptions {}
interface AuthOptions extends GetTokenOptions {
  request: Request;
  localStore: LocalStore;
}
import axios from "axios";
import { merge } from "lodash";
class BearerAuthRequest {
  request: any;
  options: AuthOptions;
  constructor(options?: Partial<AuthOptions>) {
    this.options = merge({ request: axios }, options);
    this.request = request;
  }
}
function Retry(handler) {}
// 使用上
// 这里是个单纯的request啥也没有
const request = axios;
const authRequest = new BearerAuthRequest({ request: axios });
function getApp() {
  const context: Context = {
    auth: {
      on: true,
    },
  };
  return authRequest.request(context);
}

const request = Request();
// auth
request.use(retry);
request.use(auth);
request.use(resourceHandler); // 可选
request.use(handler); // 可选
const context = request.send();
