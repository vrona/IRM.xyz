import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';

import { JsonRpcProvider } from 'ethers/providers';
import { callContractMethod } from '../../services/NewConCon'
import './ModifyOp.css';

enum SecretClassification {
  Confidential,
  Secret,
  TopSecret
}

enum OperationActive {
  Inactive,
  StandBy,
  Active
}

interface ModifyOpProps {
  provider: JsonRpcProvider;
}
export const ModifyOp: React.FC<ModifyOpProps> = ({provider}) => {
  const [opTokenId, inputOpTokenId] = useState<number>();
  const [secretClassification, optionSecretClassification] = useState<SecretClassification>(SecretClassification.Confidential);
  const [commanderName, inputCommanderName] = useState<string>('');
  const [linkReport, inputlinkReport] = useState<string>('');
  const [startDate, inputstartDate] = useState<number>();
  const [sourceCollection, inputsourceCollection] = useState<number>();
  const [opActivation, optionOpActivation] = useState<OperationActive>(OperationActive.Inactive);

  /* NEEDS TO DISPLAY CONTENT OF OPERATION STRUCT FROM BLOCKCHAIN
  const getOperationData = async (opTokenId: number, provider: JsonRpcProvider) => {
    await callContractMethod('getMetaOperation', [opTokenId], provider, 'Operation data return successfully!', 'Error return Operation Data:');
  };
  */

  const setSecretClass = async (opSecretClass: SecretClassification, provider: JsonRpcProvider) => { //opTokenId: number, 
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

  const setOpActivation = async (active: number, provider: JsonRpcProvider) =>{ //opTokenId: number, 
    await callContractMethod('opActive', [opTokenId, active], provider, 'Operation start successfully!', 'Error operation Start Date modification:');
  };

  return (
        <div className ="mod-container">
         <h2>Modify Operation</h2>
          <form id="mod-form">

            <div className ="mod-group">
              <label htmlFor="opID">Operation ID</label>
              <input type="number" id="opID" name="opID" value={opTokenId} onChange={(e) => inputOpTokenId(Number(e.target.value))}/>
              <button type="button" className='add-modify-button' onClick={() => opTokenId}>Submit</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="opSecretClass">Secret Classification</label>
              <select id="opSecretClass" name="opSecretClass" value={secretClassification} onChange={(e) => optionSecretClassification(Number(e.target.value) as SecretClassification)}>
                  <option value={SecretClassification.Confidential}>Confidential</option>
                  <option value={SecretClassification.Secret}>Secret</option>
                  <option value={SecretClassification.TopSecret}>Top Secret</option>
                </select>
              <button type="button" className='add-modify-button'  onClick={() => setSecretClass(secretClassification, provider)}>Add/Modify</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="commander">Commander</label>
              <input type="text" id="commander" name="commander" />
              <button type="button" className='add-modify-button'>Add/Modify</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="reportlink">Report Link</label>
              <input type="text" id="reportlink" name="reportlink" />
              <button type="button" className='add-modify-button'>Add/Modify</button>
            </div>
            
            <div className ="mod-group">
              <label htmlFor="startdate">Start Date</label>
              <input type="text" id="startdate" name="startdate" />
              <button type="button" className='add-modify-button'>Add/Modify</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="sourcecollect">Source Collection</label>
              <input type="text" id="sourcecollect" name="sourcecollect" />
              <button type="button" className='add-modify-button'>Add/Modify</button>
            </div>

            <div className ="mod-group">
              <label htmlFor="opactive">Operation Activation</label>
              <select id="opactive" name="opactive" value={opActivation} onChange={(e) => optionOpActivation(Number(e.target.value) as OperationActive)}>
                  <option value={OperationActive.Inactive}>Inactive</option>
                  <option value={OperationActive.StandBy}>StandBy</option>
                  <option value={OperationActive.Active}>Active</option>
                </select>
              <button type="button" className='add-modify-button'  onClick={() => setOpActivation(opActivation, provider)}>Add/Modify</button>
            </div>
          </form>
          </div>
  );
}
