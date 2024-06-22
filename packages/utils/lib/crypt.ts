import CryptoJS from "crypto-js";
/** 加解密body */

const NULL_IV = CryptoJS.enc.Hex.parse(""); // new Buffer([]);

const cryptoOptions = {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
  iv: NULL_IV,
  keySize: 256,
};
export class SimpleCrypto {
  cryptKey: CryptoJS.lib.WordArray;
  constructor(private password = "") {
    this.cryptKey = CryptoJS.enc.Utf8.parse(this.password);
  }
  /**
   * 加密文本
   * @param {*} string
   * @returns {string}
   */
  aesEncrypt(str = "") {
    const cipherParams = CryptoJS.AES.encrypt(
      str,
      this.cryptKey,
      cryptoOptions
    );
    console.log(`cipherParams.ciphertext`, cipherParams.toString());
    return cipherParams.ciphertext.toString();
  }

  /**
   * 解密文本
   * @param {*} string
   * @returns {string}
   */
  aesDecrypt(str = "") {
    const words = CryptoJS.enc.Hex.parse(str);
    const bytes = CryptoJS.AES.decrypt(
      { ciphertext: words } as CryptoJS.lib.CipherParams,
      CryptoJS.enc.Utf8.parse(this.password),
      cryptoOptions
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
