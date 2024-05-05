import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import { Connect } from '../Connect';
import { WhatHow } from '../../pages/WhatHow';
import { AskAccess } from '../../pages/AskAccess';
import { Major } from '../../pages/Major';
import { UMission } from '../../pages/UMission';
import { DMission } from '../../pages/DMission';
import { HMission } from '../../pages/HMission';

interface PageRouterProps {
  provider: BrowserProvider;
  //children: (account: string, provider: BrowserProvider) => React.ReactNode;
}

export const PageRouter: React.FC = () => {
  // const [account, setAccount] = useState('');
  // const [error, setError] = useState<string | null>(null);
  
return (
  <Connect>

       {(account: string, provider: BrowserProvider) => (
      <Routes>
        <Route path="/whathow" element={<WhatHow />} />
        <Route path="/major/*" element={<Major path="/major" provider={provider} />} />
        <Route path="/umission" element={<UMission />} />
        <Route path="/dmission" element={<DMission />} />
        <Route path="/hmission" element={<HMission />} />
        <Route path="/askaccess" element={<AskAccess />} />
      </Routes>
      )}
      
  </Connect>
  
  );
}

/*
interface ConnectedRoutesProps {
  provider: BrowserProvider;
  isConnected: boolean;
}
 <Route path="/conn" element={<ConnectedRoutes provider={provider} isConnected={isConnected} />} />
const ConnectedRoutes: React.FC<ConnectedRoutesProps> = ({ provider, isConnected }) => {
  if (isConnected) {
    // User is not connected, render the WhatHow page
    return <Route element={<WhatHow />} />;
  }

  // User is connected, render the connected pages
  return (
    <Connect>
      {(account: string, provider: BrowserProvider) => (
        <>
          <Route path="/major/*" element={<Major path="/major" provider={provider} />} />
          <Route path="/umission" element={<UMission />} />
          <Route path="/dmission" element={<DMission />} />
          <Route path="/hmission" element={<HMission />} />
        </>
      )}
    </Connect>
  );
};
*/