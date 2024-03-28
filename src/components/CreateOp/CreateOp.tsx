import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';
import { BrowserProvider, TransactionRequest, ethers } from 'ethers';
//import { JsonRpcProvider } from 'ethers/providers';
import { callContractMethod } from '../../services/NewConCon'
import { Connect } from '../Connect';
import { PopUp } from '../PopUp';
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
  const [opNameValue, inputOpName] = useState<string>('');
  const [commanderNameValue, inputCommanderName] = useState<string>('');
  const [secretClassification, optionSecretClassification] = useState<SecretClassification>(SecretClassification.Confidential);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');

  const transactionOp: TransactionRequest = {
  //to: rightContractAddress,
  value: ethers.parseEther('0.006'), // Convert value to wei (example uses 0.000000002 ether)
  //data: transaction.data, // Include transaction data
  gasLimit: 3000000,
  gasPrice: ethers.parseUnits('1.5', 'gwei') // Convert gas price to wei
  };

  const createOperation = async (
    opName: string,
    opSecretClass: SecretClassification,
    commander: string,
    provider: BrowserProvider,
    ) => {
      try {
      await callContractMethod({
      methodName: 'createOperation',
      params: [opName, opSecretClass, commander],
      provider: provider,
      transactionOptions: transactionOp,
      successCallback: (opTokenId: number, opName: string)  => {
        setPopupMessage(`Operation Created, Remember >>> ID: ${opTokenId}, Name: ${opName}`);
        setShowPopup(true);
      },
      errorCallback: (error) => {
        setPopupMessage(`Failed to create operation. Please check the console for details.`);
        setShowPopup(true);
        console.error('ErrorCallBack creating operation:', error);
      },
    });
  } catch (error) {
    console.error('ErrorTry creating operation:', error);
    // Optionally, handle error here
  }
};
 
  return (
    <Connect>
      {(account, provider) => (
          <div className ="form-container">
            <h2>Create Operation</h2>
            <form id="operation-form">
              <div className ="form-group">
                <label htmlFor="opName">Operation Name</label>
                <input type="text" id="opName" name="opName" value={opNameValue} onChange={(e) => {inputOpName(String(e.target.value)); console.log(e.target.value, typeof e.target.value);}}/>
              </div>
              <div className ="form-group">
                <label htmlFor="opSecretClass">Secret Classification Level</label>
                <select id="opSecretClass" name="opSecretClass" value={secretClassification} onChange={(e) => {
                  const selectedValue = e.target.value;
                  const levelClassificationValue = parseInt(selectedValue,10);
                  optionSecretClassification(levelClassificationValue as SecretClassification); console.log(levelClassificationValue, typeof levelClassificationValue)}}>
                    <option value={SecretClassification.Confidential}>Confidential</option>
                    <option value={SecretClassification.Secret}>Secret</option>
                    <option value={SecretClassification.TopSecret}>Top Secret</option>
                  </select>
              </div>
              <div className ="form-group">
                  <label htmlFor="commander">Commander Name</label>
                  <input type="text" id="commander" name="commander" value={commanderNameValue} onChange={(e) => {inputCommanderName(String(e.target.value)); console.log(e.target.value, typeof e.target.value);}}/>
              </div>
            <button type="button" className='create-operation-button' onClick={() => createOperation(opNameValue, secretClassification, commanderNameValue, provider)}>Create Operation</button>
            </form>
            {showPopup && <PopUp message={popupMessage} onClose={() => setShowPopup(false)} />}
          </div>
        )}
      </Connect>
  )
}