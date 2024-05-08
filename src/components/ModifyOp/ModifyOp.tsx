import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';
import { Connect } from '../Connect';
import { BrowserProvider } from 'ethers/providers';
import { callContractInteraction } from '../../services/HelperFunc'
import OpFactoryABI from './../CreateOp/opfactabi.json'; 
///import { filesFromPaths } from 'files-from-path'

import './ModifyOp.css';

enum SecretClassification {
  Confidential,
  Secret,
  TopSecret
}

interface IntelligenceMap {
  [key: string]: number;
}

const intelligenceMap: IntelligenceMap = {
  HUMINT: 0,
  SIGINT: 1,
  OSINT: 2,
  GEOINT: 3,
  MASINT: 4,
  CYBINT: 5,
  FININT: 6,
  IMINT: 7
};

let currentHash = 0; // Initialize the hash outside the function

async function hashSourceCollection(optedIn: { [key: string]: boolean }): Promise<number> {
  // Reset the hash to zero before recalculating
  currentHash = 0;

  // Calculate the hash based on the current state of opt-ins
  Object.keys(optedIn).forEach((key) => {

    if (optedIn[key]) {
      // Get the index/bit position for the current intelligence type
      const index = intelligenceMap[key];
      // If the option is opted-in, set the corresponding bit in the hash
      if (index !== undefined) {
        currentHash += 1 << index;
      }
    }
  });

  console.log("currentHash",currentHash)

  return currentHash; // Return the accumulated hash
}

interface ModifyOpProps {
  provider: BrowserProvider;
}
export const ModifyOp: React.FC<ModifyOpProps> = ({provider}) => {
  const [opTokenId, inputOpTokenId] = useState<number>();
  const [opCodeActive, inputOpCodeActive] = useState<number>();
  const [optedIn, setOptedIn] = useState<{ [key: string]: boolean }>({});
  const [unitengaged, inputUnitEngaged] = useState<number>();
  const [addReport, inputAddReport] = useState<string>('');
  // modifications only
  const [secretClassification, optionSecretClassification] = useState<SecretClassification| null>(null);
  const [commanderName, inputCommanderName] = useState<string>('');
  const [transferCommand, inputTransferCommand] = useState<string>('');


   // to handle encryption of AESprivateKey
  const [encryption, setEncryption] = useState<Uint8Array>();
  //const [token, setToken] = useState<ReturnType<typeof instance.generateToken>>();
  const instance = getInstance();

  /* NEEDS TO DISPLAY CONTENT OF OPERATION STRUCT FROM BLOCKCHAIN
  const getOperationData = async (opTokenId: number, provider: BrowserProvider) => {
    await callContractInteraction('getMetaOperation', [opTokenId], provider, 'Operation data return successfully!', 'Error return Operation Data:');
  };
  */

  const contractAddress = '0xeD790C4cE953055A2b98938A764E0AD31Ce14164';

  const secretActiveCode = async (opTokenId: number, opSecretActiveCode: number, provider: BrowserProvider) => {
    useEffect(() =>{
        setEncryption(instance.encrypt16(opSecretActiveCode));
        }, [instance, opSecretActiveCode])

      try {
        await callContractInteraction({
          methodName:'opSecretActive', 
          params:[opTokenId, encryption],
          provider: provider,
          contractAddress: contractAddress,
          contractABI: OpFactoryABI,
          successMessage: 'Secret Active Code well encrypted and stored!',
          errorMessage: 'Error encrypting or storing secret active code'});
        } catch (error){
          console.error('Error running callContractInteraction for secretActiveCode', error)
        };
    };

    const handleOptInToggle = (optedInKey: string) => {
    setOptedIn((prevState) => ({
      ...prevState,
      [optedInKey]: !prevState[optedInKey]
    }));
    };

      const setUnitsEngaged = async (opTokenId: number, unitengaged: number, provider: BrowserProvider) =>{
    await callContractInteraction(
      {
      methodName:'storeUnitEngagement', 
      params:[opTokenId, unitengaged],
      provider: provider,
      contractAddress: contractAddress,
      contractABI: OpFactoryABI,
      successMessage: 'Units engaged added successfully!',
      errorMessage: 'Error adding units engaged:'});
  };

  const setSecretClass = async (opTokenId: number, opSecretClass: SecretClassification, provider: BrowserProvider) => {
    await callContractInteraction({
      methodName:'secretClass', 
      params:[opTokenId, opSecretClass],
      provider: provider,
      contractAddress: contractAddress,
      contractABI: OpFactoryABI,
      successMessage: 'Secret level modified successfully!',
      errorMessage: 'Error secret level modification:'});
  };

  const setCommanderName = async (opTokenId: number, commandOfficer: string, provider: BrowserProvider) =>{
    await callContractInteraction({
      methodName:'commanderName', 
      params:[opTokenId, commandOfficer],
      provider: provider,
      contractAddress: contractAddress,
      contractABI: OpFactoryABI,
      successMessage: 'Commander officer modified successfully!',
      errorMessage: 'Error Commander name modification:'});
  };

  const transferNewCommand = async (toAddress: string, opTokenId: number, provider: BrowserProvider) =>{
    const fromAddress = (await provider.getSigner()).address;
    await callContractInteraction({
      methodName:'transferOperation', 
      params:[fromAddress, toAddress, opTokenId],
      provider: provider,
      contractAddress: contractAddress,
      contractABI: OpFactoryABI,
      successMessage: 'Operation ownership transfered successfully!',
      errorMessage: 'Error transfer operaton ownership:'});
  };

  // To store, we need to 1. get privateKey from Devnet, 2. decrypted it, 3.encrypt the files, 4.upload to IPFS, 5.get the path, 6. pass it to storingReport
  const storingReport = async (opTokenId: number, linkOfReport: string, provider: BrowserProvider) =>{
    await callContractInteraction({
      methodName:'storeReports',
      params:[opTokenId, linkOfReport],
      provider: provider,
      contractAddress: contractAddress,
      contractABI: OpFactoryABI,
      successMessage: 'Report modified successfully!',
      errorMessage: 'Error Report link modification:'});
  };

  return (
    <Connect>
      {(account, provider) => (
        <div className ="opemodification">
         <h2>Operation Details</h2>
          <form id="modify-form">

           <div className="optitle-container">
            <h4 className="title-part">Operation</h4>

            <div className ="input-group-mod">
              <label htmlFor="opID">Operation ID</label>
              <input type="number" id="opID" name="opID" value={opTokenId} onChange={(e) => inputOpTokenId(Number(e.target.value))} placeholder="Insert ID"/>
              <button type="button" className='add-modify-button' onClick={() => opTokenId}>Save</button>
            </div>
            <div className ="input-group-mod">
              <label htmlFor="opCodeID">Secret Activation</label>
              <input type="number" id="opCodeID" name="opCodeID" value={opCodeActive} onChange={(e) => inputOpCodeActive(Number(e.target.value))} placeholder="Insert Code"/>
              <button type="button" className='add-modify-button' onClick={() => {if (opTokenId !== undefined && opCodeActive !== undefined) secretActiveCode(opTokenId, opCodeActive, provider)}}>Activate</button>
            </div>
            <div className ="input-group-mod">
              <label htmlFor="opReport">Add Report</label>
              <input type="text" id="opReport" name="opReport" value={addReport} onChange={(e) => inputAddReport(String(e.target.value))} placeholder="Upload doc"/>
              <button type="button" className='add-modify-button' onClick={() => {if (opTokenId !== undefined && addReport !== undefined) storingReport(opTokenId, addReport, provider)}}>Add</button>
            </div>
            </div>
        
            
            <div className="optitle-container">
            <h4 className="title-part">Units Engaged</h4>
            <div className="mod-grid">
              {[0, 1, 2, 3].map(row => (
                <div key={row} className="mod-row">
                  {[0, 1, 2, 3].map(col => {
                    const index = row * 4 + col;
                    if (index < 8) {
                      const label = ['HUMINT', 'SIGINT', 'OSINT', 'GEOINT', 'MASINT', 'CYBINT', 'FININT', 'IMINT'][index];
                      return (
                        <div key={index} className="toggle-group">
                          <label htmlFor={`optIn${index + 1}`}>{label}</label>
                          <input
                            type="checkbox"
                            id={`optIn${index + 1}`}
                            name={`optIn${index + 1}`}
                            checked={optedIn[`optIn${index + 1}`] || false}
                            value={unitengaged}
                            onChange={async() => {
                              const optInKey = `optIn${index + 1}`;
                              handleOptInToggle(optInKey);
                              //const optInValue = optedIn[optInKey]; // Get the current opt-in value
                              //console.log(optInValue);
                              const newOptedIn = { ...optedIn, [optInKey]: !optedIn[optInKey] };
                              const hash = await hashSourceCollection({
                                  HUMINT: newOptedIn.optIn1,
                                  SIGINT: newOptedIn.optIn2,
                                  OSINT: newOptedIn.optIn3,
                                  GEOINT: newOptedIn.optIn4,
                                  MASINT: newOptedIn.optIn5,
                                  CYBINT: newOptedIn.optIn6,
                                  FININT: newOptedIn.optIn7,
                                  IMINT: newOptedIn.optIn8
                              });
                                inputUnitEngaged(Number(hash))
                                console.log(`Hash all ${hash}:`); // You can replace this with your logic to store the hash
                              //}
                            }}
                          />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              ))}
            </div>
            <button type="button" className='add-mod-unit-button' onClick={() => {if (opTokenId !== undefined && unitengaged !== undefined) setUnitsEngaged(opTokenId, unitengaged, provider)}}>Save</button>
            </div>

            <div className="optitle-container">
            <h4 className="title-part">Modification ONLY</h4>

             <div className ="input-group-mod">
                <label htmlFor="opSecretClass">Secret Classification</label>
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
                  <button type="button" className='add-modify-button'  onClick={() => {if (opTokenId !== undefined && secretClassification !== null) setSecretClass(opTokenId, secretClassification, provider)}}>Save</button>
              </div>

            <div className ="input-group-mod">
              <label htmlFor="commander">Commander</label>
              <input type="text" id="commander" name="commander" value={commanderName} onChange={(e) => inputCommanderName(String(e.target.value))} placeholder="Type Commander"/>
              <button type="button" className='add-modify-button' onClick={() => {if (opTokenId !== undefined && commanderName !== undefined) setCommanderName(opTokenId, commanderName, provider)}}>Save</button>
            </div>

            <div className ="input-group-mod">
              <label htmlFor="transferOP">Transfer Operation</label>
              <input type="text" id="transferOP" name="transferOP" value={transferCommand} onChange={(e) => inputTransferCommand(String(e.target.value))} placeholder="Add new Major ID"/>
              <button type="button" className='add-modify-button' onClick={() => {if (opTokenId !== undefined && transferCommand !== undefined) transferNewCommand(transferCommand, opTokenId, provider)}}>Transfer</button>
            </div>
            </div>

        </form>
        </div>
      )}
      </Connect>
  )
}


/*
<div className="input-group-mod">
<label htmlFor="unitengaged">Unit Engaged</label>

</div>




<div className ="input-group-mod">
  <label htmlFor="reportlink">Report Link</label>
  <input type="text" id="reportlink" name="reportlink" />
  <button type="button" className='add-modify-button'>Save</button>
</div>
*/