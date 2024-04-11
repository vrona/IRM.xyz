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

function hashSourceCollection(HUMINT: boolean, SIGINT: boolean, OSINT: boolean, GEOINT: boolean, MASINT: boolean, CYBINT: boolean, FININT: boolean, IMINT: boolean): number {
  let optInsNumber = 0;
  optInsNumber |= HUMINT ? 1 : 0;
  optInsNumber |= SIGINT ? 1 << 1 : 0;
  optInsNumber |= OSINT ? 1 << 2 : 0;
  optInsNumber |= GEOINT ? 1 << 3 : 0;
  optInsNumber |= MASINT ? 1 << 4 : 0;
  optInsNumber |= CYBINT ? 1 << 5 : 0;
  optInsNumber |= FININT ? 1 << 6 : 0;
  optInsNumber |= IMINT ? 1 << 7 : 0;
  return optInsNumber; // 8-bits
}

interface ModifyOpProps {
  provider: BrowserProvider;
}
export const ModifyOp: React.FC<ModifyOpProps> = ({provider}) => {
  const [opTokenId, inputOpTokenId] = useState<number>();
  const [secretClassification, optionSecretClassification] = useState<SecretClassification>(SecretClassification.Confidential);
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

  const handleOptInToggle = (optInName: string) => {
    setOptedIn((prevState) => ({
      ...prevState,
      [optInName]: !prevState[optInName]
  }));
  };

  return (
    <Connect>
      {(account, provider) => (
        <div className ="opemodification">
         <h2>Modify Operation</h2>
          <form id="modify-form">

           <div className="title-container">
            <h4 className="title-part">Operation</h4>

            <div className ="input-group">
              <label htmlFor="opID">Insert OpID</label>
              <input type="number" id="opID" name="opID" value={opTokenId} onChange={(e) => inputOpTokenId(Number(e.target.value))}/>
              <button type="button" className='add-modify-button' onClick={() => opTokenId}>Submit</button>
            </div>
            </div>
            
            <div className="title-container">
            <h4 className="title-part">Operation ID</h4>

            <div className ="input-group">
              <label htmlFor="opSecretClass">Secret Classification</label>
              <select id="opSecretClass" name="opSecretClass" value={secretClassification} onChange={(e) => optionSecretClassification(Number(e.target.value) as SecretClassification)}>
                  <option value={SecretClassification.Confidential}>Confidential</option>
                  <option value={SecretClassification.Secret}>Secret</option>
                  <option value={SecretClassification.TopSecret}>Top Secret</option>
                </select>
              <button type="button" className='add-modify-button'  onClick={() => setSecretClass(secretClassification, provider)}>Add/Modify</button>
            </div>

            <div className ="input-group">
              <label htmlFor="commander">Commander</label>
              <input type="text" id="commander" name="commander" />
              <button type="button" className='add-modify-button'>Add/Modify</button>
            </div>
            </div>

            <div className="title-container">
            <h4 className="title-part">UNIT ENGAGED</h4>
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
                            onChange={() => {
                              handleOptInToggle(`optIn${index + 1}`);
                              if (!optedIn[`optIn${index + 1}`]) {
                                const hash = hashSourceCollection(
                                  label === 'HUMINT',
                                  label === 'SIGINT',
                                  label === 'OSINT',
                                  label === 'GEOINT',
                                  label === 'MASINT',
                                  label === 'CYBINT',
                                  label === 'FININT',
                                  label === 'IMINT'
                                );
                                console.log(`Hash for ${label}:`, hash); // You can replace this with your logic to store the hash
                              }
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
            <button type="button" className='add-modify-button'>Add/Modify</button>
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
  <button type="button" className='add-modify-button'>Add/Modify</button>
</div>
*/