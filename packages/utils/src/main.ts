import { SimpleCrypto } from "../lib/crypt";
const crypto = new SimpleCrypto("meeyibodyencryptdecryptpassword1");
const original = "aaa";
const dtext = crypto.aesEncrypt(original);

const text = crypto.aesDecrypt(dtext);
console.log(`dtext`, dtext);
console.log(`text`, text);
console.log(`text === original`, text === original);
