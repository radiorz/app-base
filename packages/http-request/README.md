# @tikkhun/request

使用 request 经常包括认证、重试，资源增删改查等功能或策略

所以有了这个 request

## 使用

```javascript
import { Auth, GetTokenOptions, RemoteStore, Request } from "../lib";

const request = new Request(
  new Auth({
    username: "xxx",
    password: "yyy",
  }),
  {
    baseURL: "http://xxx",
  }
);
async function bootstrap() {
  await request.init();
  const result = await request.get("/xxx");
  console.log(`result`, result);
}
bootstrap();
```
