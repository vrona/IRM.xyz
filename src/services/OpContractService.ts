import { BrowserProvider, TransactionRequest } from 'ethers';
import { ethers } from 'ethers'; // Import ethers.js library
import OpFactoryABI from './opfactabi.json'; // Import ABI of your smart contract

interface CallContractMethodParams {
  methodName: string;
  params: any[];
  provider: BrowserProvider;
  requestTransactionApproval: (transaction: TransactionRequest) => void;
  successCallback: (opTokenId: number, opName: string) => void;
  errorCallback: (error: any) => void;
  successMessage?: string; // Optional success message
}

export const callContractMethod = async ({
  methodName,
  params,
  provider,
  requestTransactionApproval,
  successCallback,
  errorCallback,
  successMessage = "Operation completed successfully!"
}: CallContractMethodParams) => {
  
  try {
    const signer = await provider.getSigner();
    const opContractAddress = '0x299a751e37cc50732fedCAa142537D6A1161EeBA';
    const contract = new ethers.Contract(opContractAddress, OpFactoryABI, signer);

  
    const transaction = await contract[methodName](...params);

      // Request transaction approval if available
    requestTransactionApproval({
        to: opContractAddress,
        value: 0.000000002, // Example value, adjust as needed
        data: transaction.data, // Include transaction data
        gasLimit: 3000000,
        gasPrice: ethers.parseUnits('1.5', 'gwei')
      });

      // Otherwise, proceed with the transaction without approval
    const receipt = await transaction.wait();

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

// return (
//     <Connect>
//       {(account, connectedProvider) => (
//         <button onClick={() => handleTransaction(connectedProvider)}>
//           Execute Transaction
//         </button>
//       )}
//     </Connect>
//   );
// };

