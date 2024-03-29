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
}

export const PageRouter: React.FC<PageRouterProps> = () => {

return(
      <Connect>
      {(account: string, provider: BrowserProvider) =>(
      <Router>

        <Routes>
        
          {/* Render each Route component individually */}
          <Route path="/" element={<WhatHow/>} />
          <Route path="/major/*" element={<Major path="/major" provider={provider} />} />
          <Route path="/umission" element={<UMission/>} />
          <Route path="/dmission" element={<DMission/>} />
          <Route path="/hmission" element={<HMission/>} />
          <Route path="/accdenied" element={<AskAccess/>} />
        </Routes>
      </Router>
      
      )
      }
      </Connect>
  
    )}