import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';

import { JsonRpcProvider } from 'ethers/providers';
import { Connect } from '../Connect'; // Import Connect component
import { callContractMethod } from '../../services/OpContractService'

enum SecretClassification {
  Confidential,
  Secret,
  TopSecret
}

export const CreateOp: React.FC = () => {
  const createOperation = async (opName: string, opSecretClass: SecretClassification, commander: string, provider: JsonRpcProvider) => {
    await callContractMethod('createOperation', [opName, opSecretClass, commander], provider, 'Operation created successfully!', 'Error creating Operation:');
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
        </div>
      )}
    </Connect>
  );
}