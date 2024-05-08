import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { Connect } from '../Connect';

import './Cube.css';

interface PageRouterProps {
  provider: BrowserProvider;
  //children: (account: string, provider: BrowserProvider) => React.ReactNode;
}

export const Cube: React.FC = () => {
  
 

return (
  <Connect>

       {(account: string, provider: BrowserProvider) => (
        
        <div className="cube-container">
          <div className="cube">
        
            <div className="face front">
            WhatHow
            </div>
            <div className="face top">
            Major
            </div>
            <div className="face left">
            UMission
            </div>
            <div className="face bottom">
              DMission
            </div>
            <div className="face right">
              HMission
            </div>
            <div className="face back">
              AskAccess
            </div>
          </div>
        </div>
      )}
      
  </Connect>
  
  );

}

/*
<Routes>
        <Route path="/whathow" element={<WhatHow />} />
        <Route path="/major/*" element={<Major path="/major" provider={provider} />} />
        <Route path="/umission" element={<UMission />} />
        <Route path="/dmission" element={<DMission />} />
        <Route path="/hmission" element={<HMission />} />
        <Route path="/askaccess" element={<AskAccess />} />
      </Routes>



 
      */
