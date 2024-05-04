import { BrowserProvider, ethers } from 'ethers';

interface ContractInteraction {
    methodName: string,
    params: any[],
    provider: BrowserProvider,
    contractAddress: string,
    contractABI: any,
    successMessage: string,
    errorMessage: string
}
export const callContractInteraction = async ({
    methodName,
    params,
    provider,
    contractAddress,
    contractABI,
    successMessage,
    errorMessage}:ContractInteraction) => {
        try {
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const transactionOptions = {
            gasLimit: 10000000,
            }
            const transaction = await contract[methodName](...params, transactionOptions);
            const receipt = await transaction.wait(1);
            console.log("Type Of:", typeof receipt);

            alert(successMessage);
            console.log(transaction)
        } catch (error) {
            console.error(errorMessage, error);
            alert(`${error}.`);
        }
  };

  /*
  example of implementation
  try {
        await callFactContractMethod(
        'opKey',
        [opTokenId, encryption],
        provider, 'Success of PrivateAESKey encryption',
        'Failed to encrypt PrivateAESKey'
      );
    } catch(error) {
      console.error('Error while calling contract inside encryptAES CreateOp', error);
    }
  };
  */