import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';

import { JsonRpcProvider } from 'ethers/providers';
import { callContractMethod } from '../../services/OpContractService'
import './CreateOp.css';

interface CreateOpProps {
  provider: JsonRpcProvider;
}
enum SecretClassification {
  Confidential,
  Secret,
  TopSecret
}

export const CreateOp: React.FC<CreateOpProps> = ({provider}) => {
  const [opNameValue, inputOpName] = useState<string>('');
  const [commanderNameValue, inputCommanderName] = useState<string>('');
  const [secretClassification, optionSecretClassification] = useState<SecretClassification>(SecretClassification.Confidential);

  const createOperation = async (opName: string, opSecretClass: SecretClassification, commander: string, provider: JsonRpcProvider) => {
    await callContractMethod('createOperation', [opName, opSecretClass, commander], provider, 'Operation created successfully!', 'Error creating Operation:');
  };

  return (
          <div className ="form-container">
            <h2>Create Operation</h2>
            <form id="operation-form">
              <div className ="form-group">
                <label htmlFor="opName">Operation Name</label>
                <input type="text" id="opName" name="opName" value={opNameValue} onChange={(e) => inputOpName(String(e.target.value))}/>
              </div>
              <div className ="form-group">
                <label htmlFor="opSecretClass">Secret Classification Level</label>
                <select id="opSecretClass" name="opSecretClass" value={secretClassification} onChange={(e) => optionSecretClassification(Number(e.target.value) as SecretClassification)}>
                    <option value={SecretClassification.Confidential}>Confidential</option>
                    <option value={SecretClassification.Secret}>Secret</option>
                    <option value={SecretClassification.TopSecret}>Top Secret</option>
                  </select>
              </div>
              <div className ="form-group">
                  <label htmlFor="commander">Commander Name</label>
                  <input type="text" id="commander" name="commander" value={commanderNameValue} onChange={(e) => inputCommanderName(String(e.target.value))}/>
              </div>
            <button type="submit" className='create-operation-button'onClick={() => createOperation(opNameValue, secretClassification, commanderNameValue, provider)}>Create Operation</button>
            </form>
          </div>     

        );
}