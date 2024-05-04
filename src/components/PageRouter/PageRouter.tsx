import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import { Connect } from '../Connect';
import Welcome  from '../../pages/Welcome/Welcome';
import { WhatHow } from '../../pages/WhatHow';
import { AskAccess } from '../../pages/AskAccess';
import { Major } from '../../pages/Major';
import { UMission } from '../../pages/UMission';
import { DMission } from '../../pages/DMission';
import { HMission } from '../../pages/HMission';

interface PageRouterProps {
  provider: BrowserProvider;
}

export const PageRouter: React.FC<PageRouterProps> = () => {

return(
                
      <Connect>
      {(account: string, provider: BrowserProvider) =>(
        
        <Routes>
        
          {/* Render each Route component individually */}
          <Route path="/"element={<Welcome />} />
          <Route path="/conn" element={<WhatHow/>} />
          <Route path="/conn/major/*" element={<Major path="/conn/major" provider={provider} />} />
          <Route path="/conn/umission" element={<UMission/>} />
          <Route path="/conn/dmission" element={<DMission/>} />
          <Route path="/conn/hmission" element={<HMission/>} />
          <Route path="/conn/accdenied" element={<AskAccess/>} />
        </Routes>
      
      )
      }
      </Connect>
  
    )}