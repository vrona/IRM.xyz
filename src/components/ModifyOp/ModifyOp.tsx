import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';
import { Connect } from '../Connect';
import { BrowserProvider } from 'ethers/providers';
import { callContractMethod } from '../../services/NewConCon'
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
  const [secretClassification, optionSecretClassification] = useState<SecretClassification| null>(null);
  const [commanderName, inputCommanderName] = useState<string>('');
  const [linkReport, inputlinkReport] = useState<string>('');
  const [startDate, inputstartDate] = useState<number>();
  const [sourceCollection, inputsourceCollection] = useState<number>();
  const [optedIn, setOptedIn] = useState<{ [key: string]: boolean }>({});

  /* NEEDS TO DISPLAY CONTENT OF OPERATION STRUCT FROM BLOCKCHAIN
  const getOperationData = async (opTokenId: number, provider: BrowserProvider) => {
    await callContractMethod('getMetaOperation', [opTokenId], provider, 'Operation data return successfully!', 'Error return Operation Data:');
  };
  */

  const contractAddress = '0xeD790C4cE953055A2b98938A764E0AD31Ce14164';

  const setSecretClass = async (opSecretClass: SecretClassification, provider: BrowserProvider) => { //opTokenId: number, 
    await callContractMethod('secretClass', [opTokenId, opSecretClass], provider, contractAddress,'Secret level modified successfully!', 'Error secret level modification:');
  };

  const setCommanderName = async (opTokenId: number, _commandOfficer: string, provider: BrowserProvider) =>{
    await callContractMethod('commanderName', [opTokenId, _commandOfficer], provider, contractAddress,'Commander officer modified successfully!', 'Error Commander name modification:');
  };

  const storingReport = async (opTokenId: number, _linkOfReport: string, provider: BrowserProvider) =>{
    await callContractMethod('storeReports', [opTokenId, _linkOfReport], provider, contractAddress,'Report modified successfully!', 'Error Report link modification:');
  };
  
  const setSourceCollection = async (opTokenId: number, collectionOfSources: number, provider: BrowserProvider) =>{
    await callContractMethod('sourceCollection', [opTokenId, collectionOfSources],provider, contractAddress, 'Operation Sources Collection successfully!', 'Error operation sources Collection modification:');
  };

  const handleOptInToggle = (optedInKey: string) => {
    setOptedIn((prevState) => ({
      ...prevState,
      [optedInKey]: !prevState[optedInKey]
  }));
  };

  return (
    <Connect>
      {(account, provider) => (
        <div className ="opemodification">
         <h2>Operation Details</h2>
          <form id="modify-form">

           <div className="title-container">
            <h4 className="title-part">Operation</h4>

            <div className ="input-group">
              <label htmlFor="opID">Operation ID</label>
              <input type="number" id="opID" name="opID" value={opTokenId} onChange={(e) => inputOpTokenId(Number(e.target.value))} placeholder="Insert ID"/>
              <button type="button" className='add-modify-button' onClick={() => opTokenId}>Save</button>
            </div>
            <div className ="input-group">
              <label htmlFor="opCodeID">Secret Activation</label>
              <input type="number" id="opCodeID" name="opCodeID" value={opCodeActive} onChange={(e) => inputOpCodeActive(Number(e.target.value))} placeholder="Insert Code"/>
              <button type="button" className='add-modify-button' onClick={() => opCodeActive}>Activate</button>
            </div>
            </div>
            
            <div className="title-container">
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
            <button type="button" className='add-mod-unit-button'>Save</button>
            </div>

            <div className="title-container">
            <h4 className="title-part">Modification ONLY</h4>

             <div className ="input-group">
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
                  <button type="button" className='add-modify-button'  onClick={() => {if (secretClassification !== null) setSecretClass(secretClassification, provider)}}>Save</button>
              </div>

            <div className ="input-group">
              <label htmlFor="commander">Commander</label>
              <input type="text" id="commander" name="commander" placeholder="Type Commander"/>
              <button type="button" className='add-modify-button'>Save</button>
            </div>

            <div className ="input-group">
              <label htmlFor="transferOP">Transfer Operation</label>
              <input type="text" id="transferOP" name="transferOP" placeholder="Add new Major ID"/>
              <button type="button" className='add-modify-button'>Transfer</button>
            </div>
            </div>

        </form>
        </div>
      )}
      </Connect>
  )
}


/*
<div className="input-group">
<label htmlFor="unitengaged">Unit Engaged</label>

</div>




<div className ="input-group">
  <label htmlFor="reportlink">Report Link</label>
  <input type="text" id="reportlink" name="reportlink" />
  <button type="button" className='add-modify-button'>Save</button>
</div>
*/