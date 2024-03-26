import { useEffect, useState } from 'react';
import { BrowserProvider, TransactionRequest } from 'ethers';
import { ethers } from 'ethers'; // Import ethers.js library
import RightMgtABI from './irmrightsabi.json'; // Import ABI of your smart contract
import './RightMgt.css';
interface RightMgtProps {
  provider: BrowserProvider;
}

// Define the isAddress function
function isAddress(address: string): boolean {
  try {
    ethers.getAddress(address);
    return true;
  } catch (error) {
    return false;
  }
}


export const callRightContractMethod = async (methodName: string, params: any[], provider: BrowserProvider, successMessage: string, errorMessage: string) => {
  const signer = await provider.getSigner();
  const rightContractAddress = '0x1DEe0eaC29342f0865Ac865e4e48e2Fecf5A9305';
  const contract = new ethers.Contract(rightContractAddress, RightMgtABI, signer);

  try {
    await contract[methodName](...params);
    alert(successMessage);
  } catch (error) {
    console.error(errorMessage, error);
    alert(`Failed to ${errorMessage}. Please check the console for details.`);
  }
};

export const RightMgt: React.FC<RightMgtProps> = ({ provider }) => {
  const [add_pers_conf, input_conf] = useState<string>('');
  const [add_pers_sec, input_sec] = useState<string>('');
  const [add_pers_tosec, input_tosec] = useState<string>('');
  const [add_majorrank, inputadd_majorank] = useState<string>('');
  const [add_officerank, inputadd_officerank] = useState<string>('');
  const [add_operarank, inputadd_operank] = useState<string>('');

  const setConfidentialAcc = async (_personnel: string, provider: BrowserProvider) => {
    if (!isAddress(_personnel)) {
      alert('Invalid Ethereum address');
      return;
    }
    await callRightContractMethod('setConfidentialAcc', [_personnel], provider, 'Confidential Accreditation set successfully!', 'Error setting Confidential Accreditation:');
  };

  const setSecretAcc = async (_personnel: string, provider: BrowserProvider) => {
    if (!isAddress(_personnel)) {
      alert('Invalid Ethereum address');
      return;
    }
    await callRightContractMethod('setSecretAcc', [_personnel], provider, 'Secret Accreditation set successfully!', 'Error setting Secret Accreditation:');
  };

  const setTopSecretAcc = async (_personnel: string, provider: BrowserProvider) => {
    if (!isAddress(_personnel)) {
      alert('Invalid Ethereum address');
      return;
    }
    await callRightContractMethod('setTopSecretAcc', [_personnel], provider, 'Top Secret Accreditation set successfully!', 'Error setting Top Secret Accreditation:');
  };

  const setMajorRank = async (_personnel: string, provider: BrowserProvider) => {
    if (!isAddress(_personnel)) {
      alert('Invalid Ethereum address');
      return;
    }
    await callRightContractMethod('setMajorRank', [_personnel], provider, 'Major Rank set successfully!', 'Error setting Major Rank:');
  };

  const setOfficerRank = async (_personnel: string, provider: BrowserProvider) => {
    if (!isAddress(_personnel)) {
      alert('Invalid Ethereum address');
      return;
    }
    await callRightContractMethod('setOfficerRank', [_personnel], provider, 'Officer Rank set successfully!', 'Error setting Officer Rank:');
  };

  const setOperatorRank = async (_personnel: string, provider: BrowserProvider) => {
    if (!isAddress(_personnel)) {
      alert('Invalid Ethereum address');
      return;
    }
    await callRightContractMethod('setOperatorRank', [_personnel], provider, 'Operator Rank set successfully!', 'Error setting Operator Rank:');
  };

  return (
              
    <div className ="rightmgt">
      <h2>RIGHTS MANAGEMENT</h2>
      <form id="right-form">
        <div className='title-part'>
          <h4>Set Accreditation</h4>
        </div>
        
        <div className ="button-group">
          <label htmlFor="confAcc">Confidential</label>
          <input type="string" id="confAcc" name="confAcc" value={add_pers_conf} onChange={(e) => input_conf(String(e.target.value))}/>
          <button type="button" className='set-acc-button' onClick={() =>setConfidentialAcc(add_pers_conf, provider)}>Set Accreditation</button>
        </div>

        <div className ="button-group">
          <label htmlFor="secAcc">Secret</label>
          <input type="string" id="secAcc" name="secAcc" value={add_pers_sec} onChange={(e) => input_sec(String(e.target.value))}/>
          <button type="button" className='set-acc-button' onClick={() => setSecretAcc(add_pers_sec, provider)}>Set Accreditation</button>
        </div>

        <div className ="button-group">
          <label htmlFor="tosecAcc">Top Secret</label>
          <input type="string" id="tosecAcc" name="tosecAcc" value={add_pers_tosec} onChange={(e) => input_tosec(String(e.target.value))}/>
          <button type="button" className='set-acc-button' onClick={() => setTopSecretAcc(add_pers_tosec, provider)}>Set Accreditation</button>
        </div>

         <div className='title-part'>
          <h4>Set Ranking</h4>
        </div>

        <div className ="button-group">
          <label htmlFor="rankmajor">Major</label>
          <input type="string" id="rankmajor" name="rankmajor" value={add_majorrank} onChange={(e) => inputadd_majorank(String(e.target.value))}/>
          <button type="button" className='set-rank-button' onClick={() => setMajorRank(add_majorrank, provider)}>Set Ranking</button>
        </div>

                <div className ="button-group">
          <label htmlFor="rankmofficer">Officer</label>
          <input type="string" id="rankmofficer" name="rankmofficer" value={add_officerank} onChange={(e) => inputadd_officerank(String(e.target.value))}/>
          <button type="button" className='set-rank-button' onClick={() => setOfficerRank(add_officerank, provider)}>Set Ranking</button>
        </div>

                <div className ="button-group">
          <label htmlFor="rankoperator">Operator</label>
          <input type="string" id="rankoperator" name="rankoperator" value={add_operarank} onChange={(e) => inputadd_operank(String(e.target.value))}/>
          <button type="button" className='set-rank-button' onClick={() => setOperatorRank(add_operarank, provider)}>Set Ranking</button>
        </div>
      </form>
    </div>
  );
};
