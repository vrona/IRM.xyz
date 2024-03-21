import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';

import './Major.css';
import { JsonRpcProvider } from 'ethers/providers';
import { Connect } from '../../components/Connect'; // Import Connect component
import { ethers } from 'ethers'; // Import ethers.js library
import OpFactoryABI from './opfactabi.json'; // Import ABI of your smart contract

enum SecretClassification {
  Confidential,
  Secret,
  TopSecret
}

const callContractMethod = async (methodName: string, params: any[], provider: JsonRpcProvider, successMessage: string, errorMessage: string) => {
  const signer = await provider.getSigner();
  const opContractAddress = '0x12FDD890227f54ADe1F252A025C3299660373b55';
  const contract = new ethers.Contract(opContractAddress, OpFactoryABI, signer);

  try {
    await contract[methodName](...params);
    alert(successMessage);
  } catch (error) {
    console.error(errorMessage, error);
    alert(`Failed to ${errorMessage}. Please check the console for details.`);
  }
};

export const Major: React.FC = () => {
  const createOperation = async (opName: string, opSecretClass: SecretClassification, commander: string, provider: JsonRpcProvider) => {
    await callContractMethod('createOperation', [opName, opSecretClass, commander], provider, 'Operation created successfully!', 'Error creating Operation:');
  };

   const setSecretClass = async (opTokenId: number, opSecretClass: SecretClassification, provider: JsonRpcProvider) => {
    await callContractMethod('secretClass', [opTokenId, opSecretClass], provider, 'Secret level modified successfully!', 'Error secret level modification:');
  };

  const setCommanderName = async (opTokenId: number, _commandOfficer: string, provider: JsonRpcProvider) =>{
    await callContractMethod('commanderName', [opTokenId, _commandOfficer], provider, 'Commander officer modified successfully!', 'Error Commander name modification:');
  };

  const storingReport = async (opTokenId: number, _linkOfReport: string, provider: JsonRpcProvider) =>{
    await callContractMethod('storeReports', [opTokenId, _linkOfReport], provider, 'Report modified successfully!', 'Error Report link modification:');
  };

  const setOpStartDate = async (opTokenId: number, startDate: number, provider: JsonRpcProvider) =>{
    await callContractMethod('opStartDate', [opTokenId, startDate], provider, 'Operation start successfully!', 'Error operation Start Date modification:');
  };
  
  const setSourceCollection = async (opTokenId: number, collectionOfSources: number, provider: JsonRpcProvider) =>{
    await callContractMethod('sourceCollection', [opTokenId, collectionOfSources], provider, 'Operation Sources Collection successfully!', 'Error operation sources Collection modification:');
  };

  const setOpActivation = async (opTokenId: number, active: number, provider: JsonRpcProvider) =>{
    await callContractMethod('opActive', [opTokenId, active], provider, 'Operation start successfully!', 'Error operation Start Date modification:');
  };

  return (
    <Connect>
      {(account: string, provider: JsonRpcProvider) => (
        <div>
          <div className ="form-container">
            <h2>Create Operation</h2>
            <form id="operation-form">
              <div className ="form-group">
                <label htmlFor="opName">Operation Name:</label>
                <input type="text" id="opName" name="opName" />
            </div>
          <div className ="form-group">
            <label htmlFor="opSecretClass">Secret Classification:</label>
            <select id="opSecretClass" name="opSecretClass">
                <option value={SecretClassification.Confidential}>Confidential</option>
                <option value={SecretClassification.Secret}>Secret</option>
                <option value={SecretClassification.TopSecret}>Top Secret</option>
              </select>
            </div>
          <div className ="form-group">
              <label htmlFor="commander">Commander:</label>
              <input type="text" id="commander" name="commander" />
            </div>
            <button type="submit" className='create-operation-button'>Create Operation</button>
          </form>
        </div>

        <div className ="mod-container">
         <h2>Modify Operation</h2>
          <form id="mod-form">
            <div className ="mod-group">
              <label htmlFor="opName">Operation ID</label>
              <input type="text" id="opID" name="opID" />
              <button type="submit" className='add-modify-button'>Submit</button>
            </div>
            <div className ="mod-group">
              <label htmlFor="opName">Operation Name</label>
              <input type="text" id="opName" name="opName" />
              <button type="submit" className='add-modify-button'>Add/Modify</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="opSecretClass">Secret Classification</label>
              <select id="opSecretClass" name="opSecretClass">
                  <option value={SecretClassification.Confidential}>Confidential</option>
                  <option value={SecretClassification.Secret}>Secret</option>
                  <option value={SecretClassification.TopSecret}>Top Secret</option>
                </select>
              <button type="submit" className='add-modify-button'>Add/Modify</button>
            </div>


            <div className ="mod-group">
              <label htmlFor="commander">Commander</label>
              <input type="text" id="commander" name="commander" />
              <button type="submit" className='add-modify-button'>Add/Modify</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="reportlink">Report Link</label>
              <input type="text" id="reportlink" name="reportlink" />
              <button type="submit" className='add-modify-button'>Add/Modify</button>
            </div>
            
            <div className ="mod-group">
              <label htmlFor="startdate">Start Date</label>
              <input type="text" id="startdate" name="startdate" />
              <button type="submit" className='add-modify-button'>Add/Modify</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="sourcecollect">Source Collection</label>
              <input type="text" id="sourcecollect" name="sourcecollect" />
              <button type="submit" className='add-modify-button'>Add/Modify</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="opactive">Op Activation</label>
              <input type="text" id="opactive" name="opactive" />
              <button type="submit" className='add-modify-button'>Add/Modify</button>
            </div>

          </form>
          </div>
        </div>
      )}
    </Connect>
  );
}

/*
//const toHexString = (number: Uint8Array) => number.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

export const Major = () => {
//   const [encryption, setEncryption] = useState<Uint8Array>();
//   const [token, setToken] = useState<ReturnType<typeof instance.generateToken>>();
//   const instance = getInstance();

//   useEffect(() => {
//     setEncryption(instance.encrypt32(1337));
//     setToken(
//       instance.generateToken({
//         verifyingContract: '0x309cf2aae85ad8a1db70ca88cfd4225bf17a7482',
//       })
//     );
//   }, [instance]);

  return (


        <h1>Headquarter</h1>


  );
};

/*
<dd className="Major__dd">
          <pre className="Major__pre">{encryption && toHexString(encryption)}</pre>
        </dd>
        <dt className="Major__title">And this is a EIP-712 token</dt>
        <dd className="Major__dd">
          <pre className="Major__pre">{token && JSON.stringify(token.token)}</pre>
        </dd>
*/
