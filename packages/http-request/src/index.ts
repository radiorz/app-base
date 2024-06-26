import { Auth, GetTokenOptions, RemoteStore, Request } from "../lib";

const request = new Request(
  new Auth({
    username: "sup",
    password: "12345678",
  }),
  {
    baseURL: "http://192.168.111.172:23040/api",
  }
);
async function bootstrap() {
  await request.init();
  const app = await request.get("/");
  console.log(`app`, app);
}
bootstrap();
