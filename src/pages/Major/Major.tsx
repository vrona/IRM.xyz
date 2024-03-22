import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';

import './Major.css';
import { JsonRpcProvider } from 'ethers/providers';
import { Connect } from '../../components/Connect'; // Import Connect component

import { CreateOp } from '../../components/CreateOp';
import { ModifyOp } from '../../components/ModifyOp';
import { RightMgt } from '../../components/RightMgt';

export const Major: React.FC = () => {


  return (
        <Connect>
      {(account: string, provider: JsonRpcProvider) => (
        <div>
          <CreateOp provider={provider} /> 
          <ModifyOp provider={provider} /> 
          <RightMgt provider={provider} /> 
        </div>
      )}
    </Connect>
  );
}
