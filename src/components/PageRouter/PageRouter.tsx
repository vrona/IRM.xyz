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
import { Cube } from '../Cube';
import './PageRouter.css';

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
        <div>
          <Cube/>
        
        <Routes>
        <Route path="/whathow" element={<WhatHow />} />
        <Route path="/major/*" element={<Major path="/major" provider={provider} />} />
        <Route path="/umission" element={<UMission />} />
        <Route path="/dmission" element={<DMission />} />
        <Route path="/hmission" element={<HMission />} />
        <Route path="/askaccess" element={<AskAccess />} />
      </Routes>
        </div>
      )}
      
  </Connect>
  
  );

}

/*




 
      */
