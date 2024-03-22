import { JsonRpcProvider } from 'ethers/providers';
import { ethers } from 'ethers'; // Import ethers.js library
import OpFactoryABI from './opfactabi.json'; // Import ABI of your smart contract
import {PopUp} from '../../src/components/PopUp';

export const callContractMethod = async (methodName: string, params: any[], provider: JsonRpcProvider, successMessage: string, errorMessage: string) => {
  const signer = await provider.getSigner();
  const opContractAddress = '0x299a751e37cc50732fedCAa142537D6A1161EeBA';
  const contract = new ethers.Contract(opContractAddress, OpFactoryABI, signer);

  try {
    await contract[methodName](...params);
    PopUp({message:successMessage});
    // Catch OpCreated event
    contract.once('OpCreated', (opTokenId: number, opName: string) => {
      console.log(`OpCreated event received - Operation ID: ${opTokenId}, Name: ${opName}`);
      // Handle event here, e.g., update UI or trigger additional actions
    });
    //alert(successMessage);
    // Catch OpCreated event
    contract.once('OpCreated', (opTokenId: number, opName: string) => {
    console.log(`OpCreated event received - Operation ID: ${opTokenId}, Name: ${opName}`);
      // Handle event here, e.g., update UI or trigger additional actions
    });
  } catch (error) {
    console.error(errorMessage, error);
    PopUp({message:`Failed to ${errorMessage}. Please check the console for details.`});
    //alert(`Failed to ${errorMessage}. Please check the console for details.`);
  }
};

