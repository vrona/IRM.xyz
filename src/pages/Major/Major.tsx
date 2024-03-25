import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';
import { BrowserProvider, TransactionRequest } from 'ethers';
import './Major.css';
import { JsonRpcProvider } from 'ethers/providers';
import { Connect } from '../../components/Connect'; // Import Connect component

import { CreateOp } from '../../components/CreateOp';
import { ModifyOp } from '../../components/ModifyOp';
import { RightMgt } from '../../components/RightMgt';

export const Major: React.FC = () => {

  return (
        <Connect>
      {(account: string, provider: BrowserProvider, requestTransactionApproval: (transaction: TransactionRequest) => void) =>(
        <div>
          <CreateOp provider={provider} requestTransactionApproval={requestTransactionApproval} />

        </div>
      )}
    </Connect>
  );
}
          // <ModifyOp provider={provider} /> 
          // <RightMgt provider={provider} /> 