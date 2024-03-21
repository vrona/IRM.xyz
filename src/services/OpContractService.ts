import { JsonRpcProvider } from 'ethers/providers';
import { ethers } from 'ethers'; // Import ethers.js library
import OpFactoryABI from './opfactabi.json'; // Import ABI of your smart contract

export const callContractMethod = async (methodName: string, params: any[], provider: JsonRpcProvider, successMessage: string, errorMessage: string) => {
  const signer = await provider.getSigner();
  const opContractAddress = '0x12FDD890227f54ADe1F252A025C3299660373b55';
  const contract = new ethers.Contract(opContractAddress, OpFactoryABI, signer);

  try {
    await contract[methodName](...params);
    alert(successMessage);
  } catch (error) {
    console.error(errorMessage, error);
    alert(`Failed to ${errorMessage}. Please check the console for details.`);
  }
};

