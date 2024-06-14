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
  private cryptKey: any;
  constructor(private password = "") {
    this.cryptKey = CryptoJS.enc.Utf8.parse(this.password);
  }
  /**
   * 加密文本
   * @param {*} string
   * @returns {string}
   */
  aesEncrypt(string = "") {
    const cipher = CryptoJS.AES.encrypt(string, this.cryptKey, cryptoOptions);
    return CryptoJS.enc.Hex.stringify(cipher.ciphertext);
  }

  /**
   * 解密文本
   * @param {*} string
   * @returns {string}
   */
  aesDecrypt(string = "") {
    const decipher = CryptoJS.AES.decrypt(
      CryptoJS.enc.Hex.parse(string).toString(),
      this.cryptKey,
      cryptoOptions
    );
    return CryptoJS.enc.Utf8.stringify(decipher);
  }
}
