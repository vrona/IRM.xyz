import { BrowserProvider } from 'ethers';
import { ethers } from 'ethers'; // Import ethers.js library
import OpFactoryABI from './opfactabi.json'; // Import ABI of your smart contract
import { createTransaction } from './test/utils';


export const callContractMethod = async (
  methodName: string,
  params: any[],
  provider: BrowserProvider,
  contractAddress: string,
  successMessage: string,
  errorMessage: string
  ) => {
  
    try {
      const signer = await provider.getSigner();
    const opContractAddress = contractAddress //local '0x299a751e37cc50732fedCAa142537D6A1161EeBA';
    const contract = new ethers.Contract(opContractAddress, OpFactoryABI, signer);
    const transactionOptions = {
    gasLimit: 10000000,
    }


    const transaction = await contract[methodName](...params, transactionOptions);
    
      // Otherwise, proceed with the transaction without approval
    const receipt = await transaction.wait(1);
    console.log(receipt);
    //console.log(receipt.events);
    // Get the event data from the receipt
    //const opTokenId = receipt.events[1].topics[1];
    ///const opName = receipt.events[1].topics[2];
    //console.log(opTokenId, opName);

    alert(successMessage);
  } catch (error) {
    console.error(errorMessage, error);
    alert(`${error}.`);
  }
};

