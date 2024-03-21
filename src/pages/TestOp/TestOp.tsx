
import { JsonRpcProvider } from 'ethers/providers';
import { Connect } from '../../components/Connect'; // Import Connect component
import { ethers } from 'ethers'; // Import ethers.js library
import YourContractABI from './opfactabi.json'; // Import ABI of your smart contract

export const OperationCreationPage: React.FC = () => {
  const createOperation = async (opName: string, opSecretClass: string, commander: string, provider: JsonRpcProvider) => {
    const signer = await provider.getSigner(); 
    const contractAddress = '0x12FDD890227f54ADe1F252A025C3299660373b55';
    const contract = new ethers.Contract(contractAddress, YourContractABI, signer);

    try {
      await contract.createOperation(opName, opSecretClass, commander);
      alert('Operation created successfully!');
    } catch (error) {
      console.error('Error creating Operation:', error);
      alert('Failed to create Operation. Please check the console for details.');
    }
  };

  return (
    <Connect>
      {(account: string, provider: JsonRpcProvider) => (
        <div>
          <h2>Create Operation</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const campName = formData.get('opName') as string;
            const campSecretClass = formData.get('opSecretClass') as string;
            const commander = formData.get('commander') as string;
            createOperation(campName, campSecretClass, commander, provider);
          }}>
            <label>
              Operation Name:
              <input type="text" name="opName" />
            </label>
            <label>
              Secret Classification:
              <input type="text" name="opSecretClass" />
            </label>
            <label>
              Commander:
              <input type="text" name="commander" />
            </label>
            <button type="submit">Create Operation</button>
          </form>
        </div>
      )}
    </Connect>
  );
}

//export default OperationCreationPage;
