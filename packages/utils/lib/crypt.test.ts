import { it, expect } from "vitest";
import { SimpleCrypto } from "../lib/crypt";
import CryptoJS from "crypto-js";
it("simple crypto", () => {
  const crypto = new SimpleCrypto("tikkhbodyencryptdecryptpassword1");
  const original = "aaa";
  const dtext = crypto.aesEncrypt(original);
  console.log(`dtext`, dtext);
  const text = crypto.aesDecrypt(dtext);
  console.log(`text`, text);
  expect(text).toBe(original);
});

it("crypto", () => {
  // Encrypt
  const original = "my message";
  var ciphertext = CryptoJS.AES.encrypt(original, "secret key 123").toString();

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  expect(originalText).toBe(original);
});
