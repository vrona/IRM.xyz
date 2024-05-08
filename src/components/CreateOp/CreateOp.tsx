import { useEffect, useState, useRef } from 'react';
import { getInstance } from '../../fhevmjs';
import { BrowserProvider, ethers } from 'ethers';
import { Connect } from '../Connect';
import { PopUp } from '../PopUp';
import OpFactoryABI from './opfactabi.json'; // Import ABI of your smart contract
import EncryptAESEngine from '../../services/EngineAES'
//import { createTransaction } from '../../services/test/utils';
import './CreateOp.css';

interface CreateOpProps {
  provider: BrowserProvider;
}
enum SecretClassification {
  Confidential,
  Secret,
  TopSecret
}

export const CreateOp: React.FC<CreateOpProps> = () => {
  const opTokenIdRef = useRef<number | null>(null);
  const opFactoContractAddress = '0xeD790C4cE953055A2b98938A764E0AD31Ce14164'; //local '0x1861666D9d20B88Cb7bD245ea07FcD082E8Be03F';
  // to handle inputs from form
  const [opNameValue, inputOpName] = useState<string>('');
  const [commanderNameValue, inputCommanderName] = useState<string>('');
  const [secretClassification, optionSecretClassification] = useState<SecretClassification| null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');

  // to handle encryption of AESprivateKey
  const [encryption, setEncryption] = useState<Uint8Array>();
  //const [token, setToken] = useState<ReturnType<typeof instance.generateToken>>();
  const instance = getInstance();

  // initiate EncryptAESEngine class
  const encryptAESEngine = new EncryptAESEngine()

    // method to run a given method within a smart contract
  const callFactContractMethod = async (
    methodName: string,
    params: any[],
    provider: BrowserProvider,
    successMessage: string,
    errorMessage: string
    ) => {
  
    try {
     
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(opFactoContractAddress, OpFactoryABI, signer);
    const transactionOptions = {
    gasLimit: 10000000,
    }
    const transaction = await contract[methodName](...params, transactionOptions);
    const receipt = await transaction.wait(1);
    console.log("Type Of:", typeof receipt);

    if(methodName == 'createOperation'){
      await operationFactoryEvent(receipt);
    }
    alert(successMessage);
    console.log(transaction)
    } catch (error) {
      console.error(errorMessage, error);
      alert(`${error}.`);
    }
  };

  // generate an AES privateKey and then encrypted by fhEVM client.
  const encryptionPrivateKey = async (opTokenId: number, provider: BrowserProvider) => {
    const privateKey = await encryptAESEngine.generateAESPrivateKey();
        useEffect(() =>{
        setEncryption(instance.encrypt32(privateKey));
        }, [instance, privateKey])

      try {
        await callFactContractMethod(
        'opKey',
        [opTokenId, encryption],
        provider, 'Success of PrivateAESKey encryption',
        'Failed to encrypt PrivateAESKey'
      );
    } catch(error) {
      console.error('Error while calling contract inside encryptAES CreateOp', error);
    }
  };

  // implementation of event parsing emit when new operation created
  const operationFactoryEvent = async (receipt: any) => {
    try{
        // Get the logs from the transaction receipt
        const logr = receipt.logs;
        const _opTokenId = logr[2].topics[1];
        const nameHex = logr[2].data;
        
        const hexWithoutPrefix = nameHex.startsWith('0x') ? nameHex.slice(2) : nameHex;

        // Convert the hexadecimal string to a Uint8Array
        const bytes = new Uint8Array(hexWithoutPrefix.match(/.{1,2}/g)!.map((byte:string) => parseInt(byte, 16)));

        // Decode the Uint8Array into a string using UTF-8 encoding
        const decoder = new TextDecoder('utf-8');
        const readableString = decoder.decode(bytes);
        opTokenIdRef.current  = parseInt(_opTokenId); // former parsOpTokenId
        // Accessing the indexed parameters from the decoded data
        console.log("Name ",readableString,"\n","OpToken ",opTokenIdRef.current)
    
      } catch(error) {
      console.error('Error while listen to Create Op Event', error);
    }

  }

// create a new operation
const createOperation = async (
    opName: string,
    opSecretClass: SecretClassification,
    commander: string,
    provider: BrowserProvider) => {
       await callFactContractMethod(
        'createOperation',
        [opName, opSecretClass, commander],
        provider, 'Operation Created, Remember >>> ID',
        'Failed to create operation. Please check the console for details.')

        if(opTokenIdRef.current !== null) {
        await encryptionPrivateKey(opTokenIdRef.current, provider);
        }
    }

  return (
    <Connect>
      {(account, provider) => (
          <div className ="form-container">
            <h2>Create Operation</h2>
            <form id="operation-form">

              <div className="cotitle-container">

              <div className ="form-group">
                <label htmlFor="opName">Operation Name</label>
                <input type="text" id="opName" name="opName" value={opNameValue}
                onChange={(e) => inputOpName(String(e.target.value))} placeholder="Type Op Name"/>
              </div>
              <div className ="form-group">
                <label htmlFor="opSecretClass">Secret Classification Level</label>
                <select id="opSecretClass" name="opSecretClass" value={secretClassification !== null ? secretClassification.toString():""}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                    if (selectedValue === "") {
                        optionSecretClassification(null);
                      } else {
                        optionSecretClassification(parseInt(selectedValue, 10) as SecretClassification);
                      }
                    }}>
                    <option value="" disabled>Choose level</option>
                    <option value={SecretClassification.Confidential}>Confidential</option>
                    <option value={SecretClassification.Secret}>Secret</option>
                    <option value={SecretClassification.TopSecret}>Top Secret</option>
                  </select>
              </div>
              <div className ="form-group">
                  <label htmlFor="commander">Commander Name</label>
                  <input type="text" id="commander" name="commander" value={commanderNameValue}
                  onChange={(e) => inputCommanderName(String(e.target.value))} placeholder="Type Commander"/>
              </div>
            <button type="button" className='create-operation-button' onClick={() => {
              if (secretClassification !== null) {createOperation(opNameValue, secretClassification, commanderNameValue, provider)} }}>Create Operation</button>
            </div>
            </form>
            {showPopup && <PopUp message={popupMessage} onClose={() => setShowPopup(false)} />}
          </div>
    
          
        )}
      </Connect>
  )
}