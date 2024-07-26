import axios from 'axios';
import {  encryptAES, encryptRSA, decryptRSA, decryptAES ,generateAESKey} from './encryption';
import {publicKey,privateKey} from './keys'

export async function sendEncryptedRequest(url, data) {
    const aesKey = generateAESKey();
    const encryptedData = encryptAES(JSON.stringify(data), aesKey);
    const encryptedAESKey = encryptRSA(aesKey, publicKey);
  
    try {
      const response = await axios.post(url, {
        encrypted: encryptedData,
        encryptedKey: encryptedAESKey
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const decryptedAESKey = decryptRSA(response.data.encryptedKey, privateKey);
      const decryptedData = decryptAES(response.data.encryptedData, decryptedAESKey);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error sending encrypted request:', error);
      throw error;
    }
  }

  export async function getEncryptedRequest() {
    const aesKey = generateAESKey();
    const encryptedData = encryptAES(JSON.stringify(data), aesKey);
    const encryptedAESKey = encryptRSA(aesKey, publicKey);
  
    try {
      const response = await axios.post(url, {
        encrypted: encryptedData,
        encryptedKey: encryptedAESKey
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const decryptedAESKey = decryptRSA(response.data.encryptedKey, privateKey);
      const decryptedData = decryptAES(response.data.encryptedData, decryptedAESKey);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error sending encrypted request:', error);
      throw error;
    }
  }