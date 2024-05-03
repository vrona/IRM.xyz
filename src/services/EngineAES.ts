import * as fs from 'fs';
import * as crypto from 'crypto';

class EncryptAESEngine {
    algorithm = 'aes-256-cbc';


public async generateAESPrivateKey(): Promise<number> {
  // Generate 8 bytes (64 bits) of random data
  const buffer = crypto.randomBytes(4);
  
  // Convert the buffer to a number
  const encryptionKey = buffer.readUInt32BE(0);
  
  return encryptionKey;
}

public async encryptFragmentAES(data: string | number, key: number): Promise<string> {
    const dataString = typeof data === 'number' ? String(data) : data;
    const privateKey = key.toString();

    const cipher = crypto.createCipheriv(this.algorithm, privateKey, Buffer.alloc(16, 0));
    let encrypted = cipher.update(dataString, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
    }

// Function to decrypt AES encrypted data
public async decryptFragmentAES(encryptedData: string, key: string): Promise<string> {
    const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.alloc(16, 0));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
    }


public async encryptAESFile(inputClearFilePath: string, outputCipherFilePath: string, key: number){
    const inputStream = fs.createReadStream(inputClearFilePath);
    const outputStream = fs.createWriteStream(outputCipherFilePath);
    const privateKey = key.toString();

    const cipher = crypto.createCipheriv(this.algorithm, privateKey, Buffer.alloc(16, 0));
    inputStream.pipe(cipher).pipe(outputStream);
    
    cipher.on('error', (error) => {
            console.error('Encryption error:', error);
        });

        outputStream.on('finish', () => {
            console.log('File encryption completed successfully.');
        });
    }

public async decryptAESFile(inputCipherFilePath: string, outputClearFilePath: string, key: number){
    const privateKey = key.toString();
    const decipher = crypto.createDecipheriv(this.algorithm, privateKey, Buffer.alloc(16, 0));
    const inputStream = fs.createReadStream(inputCipherFilePath);
    const outputStream = fs.createWriteStream(outputClearFilePath);

    inputStream.pipe(decipher).pipe(outputStream);
    
    decipher.on('error', (error) => {
            console.error('Decryption error:', error);
        });

        outputStream.on('finish', () => {
            console.log('File decryption completed successfully.');
        });
    }
}

export default EncryptAESEngine;

/* Example usage
const encryptEngine = new EncryptEngine();
const dataToEncrypt = 'Hello, World!';
const encryptionKey = 'supersecretkey'; // Should be 32 bytes for AES-256

const encryptedData = encryptEngine.encrypt(dataToEncrypt, encryptionKey);
console.log('Encrypted:', encryptedData);

const decryptedData = encryptEngine.decrypt(encryptedData, encryptionKey);
console.log('Decrypted:', decryptedData);
*/