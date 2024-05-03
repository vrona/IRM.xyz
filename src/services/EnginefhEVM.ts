import { useEffect, useState } from 'react';
import { getInstance} from '../fhevmjs';



const toHexString = (bytes: Uint8Array) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

export const Devnet = (dataToEncrypt: number, contractAddress: string) => {
  const [encryption, setEncryption] = useState<Uint8Array>();
  const [token, setToken] = useState<ReturnType<typeof instance.generatePublicKey>>();
  const instance = getInstance();

  useEffect(() => {
    setEncryption(instance.encrypt32(dataToEncrypt));
    setToken(
      instance.generatePublicKey({
        verifyingContract: contractAddress,
      })
    );
  }, [instance]);
}


// encryption && toHexString(encryption)
// token && JSON.stringify(token.token)
/*
const instance = getInstance();

const encryptedParamBool = instance.encryptBool(true);
const encryptedParam4 = instance.encrypt4(3);
const encryptedParam8 = instance.encrypt8(14);
const encryptedParam16 = instance.encrypt16(650);
const encryptedParam32 = instance.encrypt32(71721057);
const encryptedParam64 = instance.encrypt64(71721075);



const decryptData = instance.decrypt(contractAddress, dataToDecrypt);
*/