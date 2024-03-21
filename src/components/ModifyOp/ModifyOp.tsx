import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';

import { JsonRpcProvider } from 'ethers/providers';
import { Connect } from '../../components/Connect'; // Import Connect component
import { callContractMethod } from '../../services/OpContractService'

enum SecretClassification {
  Confidential,
  Secret,
  TopSecret
}


export const ModifyOp: React.FC = () => {
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
