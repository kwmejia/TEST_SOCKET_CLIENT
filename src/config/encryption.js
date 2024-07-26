import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';
import { publicKey, privateKey } from './keys'

export function generateAESKey() {
  return CryptoJS.lib.WordArray.random(32).toString(); // Genera una clave AES de 256 bits
}

export function encryptAES(data, aesKey) {
  return CryptoJS.AES.encrypt(data, aesKey).toString();
}

export function decryptAES(encryptedData, aesKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, aesKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptRSA(data, publicKey) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(data);
}

export function decryptRSA(data, privateKey) {
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  return decrypt.decrypt(data);
}
