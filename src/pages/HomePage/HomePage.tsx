
import { Connect } from '../../components/Connect';
//import { Major } from '../Major';
//import { Devnet } from '../../components/Devnet';

export const HomePage = () => {
    return (
    <>
      <h1>IRM.xyz</h1>
      <p className="credits">
        <a href="https://www.vrona.io"> developed by VRONA.</a>
        </p>
      <p className="description">
      Welcome to Intelligence Rights Management (IRM) - A demo based on on ZAMA.AI's fhEVM.<br/><br/>
      This decentralized application (DApp) allows Officers and Operators of intelligence/military services to manage,<br/>
      to modify sensitive data from different sources and for different corporations.<br/><br/>
      Personals can securely store and transfer intelligence data, ensuring transparency, immutability, and traceability throughout the process.
      </p>
      <Connect>{() => null}</Connect>
      <p className="read-the-docs">
        <a href="https://docs.zama.ai/fhevm"> see fhEVM's documentation.</a>
      </p>
    </>
  );
}

/*
<Connect>{(account, provider) => <Major />}</Connect>
<Connect>{(account, provider) => <Devnet />}</Connect>
*/