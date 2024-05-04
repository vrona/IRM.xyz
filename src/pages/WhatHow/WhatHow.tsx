
import React, { useEffect } from 'react';
import { Connect } from '../../components/Connect';
//import { Major } from '../Major';
//import { Devnet } from '../../components/Devnet';
import './WhatHow.css';

  
export const WhatHow = () => {

    return (
    <div>
      <h1 className='title-header'>
        What/How</h1>

      
      <p className="what">
      <h3>WHAT</h3><b>Intelligence Rights Management</b> (IRM) <br/>
      Intelligence/military officers and operators personals can store, modify,<br/>
      sensitive data from different sources and for different corporations.<br/><br/>
      </p>
      <p className="how">
      <h3>HOW</h3>
      <b>Accesses Only</b> either as <b>Major</b> (ask <a href="https://www.vrona.io"> VRONA</a> to be granted) or
      as <b>Officer</b> or <b>Operator</b> (ask to your Major). <br/><br/>

     <b>Roles Explanations</b>
     <dt>
      <dd> Major
        <dt>
          <dd>: creates, activates, modifies an Operation NFT (ownership can be transferred to another Major).</dd>
          <dd>: selects the different Intelligence Units (GeoInt, HumInt, ...) necessary to gather information for the success of the operation.</dd>
          <dd>: provides the operations' "Secret Active Code" to intelligence officer (recommanded method: in-person exchange).</dd>
          <dd>: uploads encrypted (AES encryption) reports.</dd>
      </dt>
      </dd><br/>
      <dd> Officer
        <dt>
          <dd>: needs the operations' "Secret Active Code" from Major to create an Mission NFT for a given Operation TokenId.</dd>
          <dd>: stores, updates information, on dedicated Mission NFT (GeoInt, HumInt, ...), based on intelligence sources.<br/>
                Mission NFT ownership can be transferred to Operator (on field), Officer (at HeadQuarter).</dd>
          <dd>: uploads encrypted content: video, picture, audio, reports.</dd>
      </dt>
      </dd><br/>
      <dd> Operator
        <dt>
          <dd>: receives Mission NFT ownership from Officer.</dd>
          <dd>: updates the intelligence sources based on his/her achievements/observations during field mission.</dd>
          <dd>: downloads encrypted content from intelligence sources : video, picture, audio, reports.</dd>
      </dt>
      </dd>
      </dt>
      </p>

    </div>
  );
}

/*
      <h2>Intelligentia - Vis - Honor - Resilio</h2>
      <p className="credits">
        developed by
        </p>
        <a href="https://www.vrona.io"> VRONA.</a>
<Connect>{(account, provider) => <Major />}</Connect>
<Connect>{(account, provider) => <Devnet />}</Connect>

    <Connect>{() => null}</Connect>
      <p className="read-the-docs">
        <a href="https://docs.zama.ai/fhevm"> see ZAMA.AI's fhEVM documentation.</a>
      </p>
*/