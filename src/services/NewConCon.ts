import { BrowserProvider, TransactionRequest } from 'ethers';
import { ethers } from 'ethers'; // Import ethers.js library
import OpFactoryABI from './opfactabi.json'; // Import ABI of your smart contract

interface CallContractMethodParams {
  methodName: string;
  params: any[];
  provider: BrowserProvider;
  transactionOptions: TransactionRequest;
  successCallback: (opTokenId: number, opName: string) => void;
  errorCallback: (error: any) => void;
  successMessage?: string; // Optional success message
}

export const callContractMethod = async ({
  methodName,
  params,
  provider,
  transactionOptions,
  successCallback,
  errorCallback,
  successMessage = "Operation completed successfully!"
}: CallContractMethodParams) => {
  
  
    const signer = await provider.getSigner();
    const opContractAddress = '0xe2C8B3a458c140Dc126bDF25e5Ea21B2D06727bb' //local '0x299a751e37cc50732fedCAa142537D6A1161EeBA';
    const contract = new ethers.Contract(opContractAddress, OpFactoryABI, signer);
    const balance = await contract.balanceOf(signer.address);
    console.log(balance);

    try {
    const transaction = await contract[methodName](...params, transactionOptions);

      // Otherwise, proceed with the transaction without approval
    const receipt = await transaction.wait(2);
    console.log(receipt);
    console.log(receipt.events);
    // Get the event data from the receipt
    const opTokenId = receipt.events[1].topics[1];
    const opName = receipt.events[1].topics[2];
    
    console.log(opTokenId, opName);
    successCallback(opTokenId, opName);
    // Catch OpCreated event
    if (successMessage) {
      alert(successMessage);
    }

    //alert(successMessage);
    return transaction;

  } catch (error) {
    errorCallback(error);
    console.error('Error:', error);
    //alert(`Failed to ${errorMessage}. Please check the console for details.`);
  }
};

