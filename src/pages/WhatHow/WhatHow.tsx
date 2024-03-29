
import React, { useEffect } from 'react';
import { Connect } from '../../components/Connect';
//import { Major } from '../Major';
//import { Devnet } from '../../components/Devnet';
import './WhatHow.css';

  
export const WhatHow = () => {

    return (
    <div>
      <h1 className='title-header'>
        IRM</h1>
      <h2>Intelligentia - Vis - Honor - Resilio</h2>
      <p className="credits">
        developed by
        <a href="https://www.vrona.io"> VRONA.</a>
      </p>
      <p className="description">
      Welcome to Intelligence Rights Management (IRM) <br/> A demo DApp based on homomorphic encryption.<br/><br/>
      IRM allows Officers and Operators of intelligence/military services to manage,<br/>
      to modify sensitive data from different sources and for different corporations.<br/><br/>
      One can securely store and transfer intelligence data, ensuring transparency,<br/> immutability, and traceability throughout the process.
      </p>
    <Connect>{() => null}</Connect>
      <p className="read-the-docs">
        <a href="https://docs.zama.ai/fhevm"> see ZAMA.AI's fhEVM documentation.</a>
      </p>
    </div>
  );
}

/*
<Connect>{(account, provider) => <Major />}</Connect>
<Connect>{(account, provider) => <Devnet />}</Connect>
*/