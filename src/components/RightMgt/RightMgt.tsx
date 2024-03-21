import { JsonRpcProvider } from 'ethers/providers';
import { ethers } from 'ethers'; // Import ethers.js library
import RightMgtABI from './irmrightsabi.json'; // Import ABI of your smart contract

export const callRightContractMethod = async (methodName: string, params: any[], provider: JsonRpcProvider, successMessage: string, errorMessage: string) => {
  const signer = await provider.getSigner();
  const rightContractAddress = '0x9bDA0F4fFF1c15cBD8d20358c517A6a25205B9BF';
  const contract = new ethers.Contract(rightContractAddress, RightMgtABI, signer);

  try {
    await contract[methodName](...params);
    alert(successMessage);
  } catch (error) {
    console.error(errorMessage, error);
    alert(`Failed to ${errorMessage}. Please check the console for details.`);
  }
};

export const RightMgt: React.FC = () => {

   const setAccred = async (_accreditation: number, _personnel: string, provider: JsonRpcProvider) => {
    await callRightContractMethod('setAccreditation', [_accreditation, _personnel], provider, 'Accreditation setted successfully!', 'Error Accreditation setted:');
  };

  const setRole = async (role: number, provider: JsonRpcProvider) => {
    await callRightContractMethod('setRoleAdmin', [role], provider, 'Role setted successfully!', 'Error Role setted:');
  };

  const setRank = async (_desiredRank: number, _candidate: string, provider: JsonRpcProvider) => {
    await callRightContractMethod('grantNewRank', [_desiredRank, _candidate], provider, 'Rank setted successfully!', 'Error Rank setted:');
  };

  return(
    <div>
        <h1>RIGHTS MGT</h1>

    </div>
  )
};
