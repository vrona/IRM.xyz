import { useEffect, useState } from 'react';
import { Connect } from '../Connect';
import { BrowserProvider, TransactionRequest } from 'ethers';
import { ethers } from 'ethers'; // Import ethers.js library
import RightMgtABI from './irmrightsabi.json'; // Import ABI of your smart contract
import { createTransaction } from '../../services/test/utils';

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

const callRightContractMethod = async (
  methodName: string,
  params: any[],
  provider: BrowserProvider,
  successMessage: string,
  errorMessage: string
  ) => {

  const signer = await provider.getSigner();
  const rightContractAddress = '0xF172c9CAF33682F32E08D46a90a4aB91eeC578D9' //local '0x1861666D9d20B88Cb7bD245ea07FcD082E8Be03F';
  const contract = new ethers.Contract(rightContractAddress, RightMgtABI, signer);
  
  
  try {
    const transaction = await createTransaction(contract[methodName],...params); //transactionOptions
    await transaction.wait(1);
    alert(successMessage);
  } catch (error) {
    console.error(errorMessage, error);
    alert(`Failed to ${errorMessage}. Please check the console for details.`);
  }
};


const factorizeFunc = async (sm_method: string, _personnel: string, provider: BrowserProvider, successMess: string, errorMess: string) => {
  if (!isAddress(_personnel)) {
      alert('Invalid Ethereum address Factorize');
      return;
  }
      await callRightContractMethod(sm_method, [_personnel], provider, successMess, errorMess);
  };
export const RightMgt: React.FC<RightMgtProps> = ({ provider }) => {
  const [add_pers_conf, input_conf] = useState<string>('');
  const [add_pers_sec, input_sec] = useState<string>('');
  const [add_pers_tosec, input_tosec] = useState<string>('');
  const [add_majorrank, inputadd_majorank] = useState<string>('');
  const [add_officerank, inputadd_officerank] = useState<string>('');
  const [add_operarank, inputadd_operank] = useState<string>('');
  const [_, setAccreditationType] = useState<string>('');
  const [__, setRankingType] = useState<string>('');

  const handleSetAccreditation = async (provider: BrowserProvider) => {
    const [personnel, accreditationType] = getDesiredAccreditation();
    if (!isAddress(personnel)) {
      alert('Invalid Ethereum address handle Accr');
      return;
    }

    switch (accreditationType) {
      case 'confidential':
        await setConfidentialAcc(personnel, provider);
        break;
      case 'secret':
        await setSecretAcc(personnel, provider);
        break;
      case 'topSecret':
        await setTopSecretAcc(personnel, provider);
        break;
      default:
        break;
    }
  };

  const getDesiredAccreditation = (): [string, string] => {
    if (add_pers_conf !== '') {
      return [add_pers_conf,'confidential'];
    } else if (add_pers_sec !== '') {
      return [add_pers_sec, 'secret'];
    } else if (add_pers_tosec !== '') {
      return [add_pers_tosec,'topSecret'];
    } else {
      return ['','']; // No active accreditation
    }
  };

  const handleSetRanking = async (provider: BrowserProvider) => {
    const [personnel, rankingType] = getDesiredRanking();
    if (!isAddress(personnel)) {
      alert('Invalid Ethereum address handle Rank');
      return;
    }

    switch (rankingType) {
      case 'major':
        await setMajorRank(personnel, provider);
        console.log('major')
        break;
      case 'officer':
        await setOfficerRank(personnel, provider);
        console.log('officer')
        break;
      case 'operator':
        await setOperatorRank(personnel, provider);
        console.log('operator')
        break;
      default:
        break;
    }
  };

  const getDesiredRanking = (): [string, string ] => {
    if (add_majorrank !== '') {
      return [add_majorrank, 'major'];
    } else if (add_officerank !== '') {
      return  [add_officerank, 'officer'] ;
    } else if (add_operarank !== '') {
      return  [add_operarank, 'operator'];
    } else {
      return ['', '']; // No active accreditation
    }
  };

  const setConfidentialAcc = async (_personnel: string, provider: BrowserProvider) => {
  await factorizeFunc('setConfidentialAcc', _personnel, provider, 'Confidential Accreditation set successfully!', 'Error setting Confidential Accreditation:');
};

const setSecretAcc = async (_personnel: string, provider: BrowserProvider) => {
  await factorizeFunc('setSecretAcc', _personnel, provider, 'Secret Accreditation set successfully!', 'Error setting Secret Accreditation:');
};

const setTopSecretAcc = async (_personnel: string, provider: BrowserProvider) => {
  await factorizeFunc('setTopSecretAcc', _personnel, provider, 'Top Secret Accreditation set successfully!', 'Error setting Top Secret Accreditation:');
};

const setMajorRank = async (_personnel: string, provider: BrowserProvider) => {
  await factorizeFunc('setMajorRank', _personnel, provider, 'Major Rank set successfully!', 'Error setting Major Rank:');
};

const setOfficerRank = async (_personnel: string, provider: BrowserProvider) => {
  await factorizeFunc('setOfficerRank', _personnel, provider, 'Officer Rank set successfully!', 'Error setting Officer Rank:');
};

const setOperatorRank = async (_personnel: string, provider: BrowserProvider) => {
  await factorizeFunc('setOperatorRank', _personnel, provider, 'Operator Rank set successfully!', 'Error setting Operator Rank:');
};

  return (
    <Connect>
      {(account, provider) => (   
    <div className ="rightmgt">
      <h2>RIGHTS MANAGEMENT</h2>
      <form id="right-form">
        <div className="title-container">
          <h4 className="title-part">ACCREDITATION</h4>
          

        <div className ="input-group">
          <label htmlFor="confAcc">Confidential</label>
          <input type="text" id="confAcc" name="confAcc" value={add_pers_conf}
          onChange={(e) => input_conf(String(e.target.value))} onFocus={() => setAccreditationType('confidential')} onBlur={() => setAccreditationType('')} placeholder="Add personnel ID"/>
        </div>

        <div className ="input-group">
          <label htmlFor="secAcc">Secret</label>
          <input type="text" id="secAcc" name="secAcc" value={add_pers_sec}
          onChange={(e) => input_sec(String(e.target.value))} onFocus={() => setAccreditationType('secret')} onBlur={() => setAccreditationType('')} placeholder="Add personnel ID"/>
        </div>

        <div className ="input-group">
          <label htmlFor="tosecAcc">Top Secret</label>
          <input type="text" id="tosecAcc" name="tosecAcc" value={add_pers_tosec}
          onChange={(e) => input_tosec(String(e.target.value))} onFocus={() => setAccreditationType('topSecret')} onBlur={() => setAccreditationType('')} placeholder="Add personnel ID"/>
        </div>

        <button type="button" className='set-acc-button' onClick={() => handleSetAccreditation(provider)}>Set Accreditation</button>
        </div>
        <div className="title-container">
          <h4 className="title-part">RANKING</h4>
          

        <div className ="input-group">
          <label htmlFor="rankmajor">Major</label>
          <input type="text" id="rankmajor" name="rankmajor" value={add_majorrank}
          onChange={(e) => inputadd_majorank(String(e.target.value))} onFocus={() => setRankingType('major')} onBlur={() => setRankingType('')} placeholder="Add personnel ID"/>
        </div>

                <div className ="input-group">
          <label htmlFor="rankmofficer">Officer</label>
          <input type="text" id="rankmofficer" name="rankmofficer" value={add_officerank}
          onChange={(e) => inputadd_officerank(String(e.target.value))} onFocus={() => setRankingType('officer')} onBlur={() => setRankingType('')} placeholder="Add personnel ID"/>
        </div>

                <div className ="input-group">
          <label htmlFor="rankoperator">Operator</label>
          <input type="text" id="rankoperator" name="rankoperator" value={add_operarank}
          onChange={(e) => inputadd_operank(String(e.target.value))} onFocus={() => setRankingType('operator')} onBlur={() => setRankingType('')} placeholder="Add personnel ID"/>
        </div>

        <button type="button" className='set-rank-button' onClick={() => handleSetRanking(provider)}>Set Ranking</button>
        </div>
      </form>
    </div>
    )}
  </Connect>
  )
}
