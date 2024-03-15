import { useEffect, useState } from 'react';
import { Devnet } from './components/Devnet';
import { init } from './fhevmjs';
import './App.css';
import { Connect } from './components/Connect';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));
  }, []);

  if (!isInitialized) return null;

  return (
    <>
      <h1>IRM.xyz</h1>
      <p className="credits">
        <a href="https://www.vrona.io"> developed by VRONA.</a>
        </p>
      <p className="description">
      Welcome to Intelligence Rights Management (IRM) - A demo based on fhEVM.<br/><br/>
      This decentralized application (DApp) allows Officers and Operators of intelligence/military services to manage,<br/>
      to modify sensitive data from different sources and for different corporations.<br/><br/>
      Personals can securely store and transfer intelligence data, ensuring transparency, immutability, and traceability throughout the process.
      </p>
      <Connect>{(account, provider) => <Devnet />}</Connect>
      <p className="read-the-docs">
        <a href="https://docs.zama.ai/fhevm"> on ZAMA.AI's fhEVM - see the documentation.</a>
      </p>
    </>
  );
}

export default App;
