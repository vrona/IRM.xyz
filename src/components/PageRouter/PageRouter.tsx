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
import './PageRouter.css';

interface PageRouterProps {
  provider: BrowserProvider;
  //children: (account: string, provider: BrowserProvider) => React.ReactNode;
}

export const PageRouter: React.FC = () => {
  // const [account, setAccount] = useState('');
  // const [error, setError] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  function setCubeSize(size: number) {
  document.documentElement.style.setProperty('--cube-size', `${size}px`);
  document.documentElement.style.setProperty('--face-size', `${size}px`); // Adjust face size proportionally
  }

  useEffect(() => {
  //const cubeSize = 700; // Desired cube size
  ///setCubeSize(cubeSize);


  const handleRotation = () => {

  const path = window.location.pathname;
    let newRotation = 0;

    switch (path) {
      case '/whathow':
        newRotation = 0;
        break;
      case '/major':
        newRotation = -90;
        break;
      case '/umission':
        newRotation = -180;
        break;
      case '/dmission':
        newRotation = -270;
        break;
      case '/hmission':
        newRotation = 90;
        break;
      case '/askaccess':
        newRotation = 180;
        break;
      default:
        newRotation = 0;
        break;
    }
    setRotation(newRotation);
 }; // setCubeSize

    // Initialize dimensions on component mount
     handleRotation();
    window.addEventListener('popstate', handleRotation);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('popstate', handleRotation);
    };
  },[]);
 

return (
  <Connect>

       {(account: string, provider: BrowserProvider) => (
        
        <div className="cube-container">
          <div className="cube" style={{ transform: `rotateY(${rotation}deg)` }}>
        
            <div className="face front">
            <Routes>
                <Route path="/whathow" element={<WhatHow />} />
              </Routes>
            </div>
            <div className="face top">
            <Routes>
              <Route path="/major/*" element={<Major path="/major" provider={provider} />} />
            </Routes>
            </div>
            <div className="face left">
            <Routes>
              <Route path="/umission" element={<UMission />} />
            </Routes>
            </div>
            <div className="face bottom">
              <Routes>
                <Route path="/dmission" element={<DMission />} />
              </Routes>
            </div>
            <div className="face right">
              <Routes>
                <Route path="/hmission" element={<HMission />} />
              </Routes>
            </div>
            <div className="face back">
              <Routes>
                <Route path="/askaccess" element={<AskAccess />} />
              </Routes>
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
