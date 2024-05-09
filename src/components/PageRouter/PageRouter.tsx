import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import { Connect } from '../Connect';
import { WhatHow } from '../../pages/WhatHow';
import { AskAccess } from '../../pages/AskAccess';
import { Major } from '../../pages/Major';
import { UMission } from '../../pages/UMission';
import { DMission } from '../../pages/DMission';
import { HMission } from '../../pages/HMission';
import '../HamburgerM/HamburgerM.css';

const HamburgerMenu = ({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) => (

  <div className="hamburger-menu">
    <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      <div className={`menu-items ${isOpen ? 'open' : ''}`}>
        <dt>
          <dd><NavLink to='/conn/whathow'> What_How </NavLink></dd>
          <dd><NavLink to="/conn/major">Major</NavLink>
            <dt className="submenu">
              <dt>
                <dd><NavLink to="/conn/major/rightsmgt">Rights_Management</NavLink></dd>
                <dd><NavLink to="/conn/major/createop">Create_Operation</NavLink></dd>
                <dd><NavLink to="/conn/major/modifop">Operation_Details</NavLink></dd>
                <dd><NavLink to="/conn/major/consult">Documents_Access</NavLink></dd>
              </dt>
            </dt>
          </dd>
            <dd><NavLink to="/conn/umission">UMission</NavLink></dd>
          <dd><NavLink to="/conn/hmission">HMission</NavLink></dd>
          <dd><NavLink to="/conn/dmission">DMission</NavLink></dd>
          {/* <dd>
            <NavLink to="/conn/askaccess">Ask Access</NavLink>
          </dd> */}
        </dt>
      </div>
      </div>
  </div>

);

interface PageRouterProps {
  provider: BrowserProvider;
  path:string;
  //children: (account: string, provider: BrowserProvider) => React.ReactNode;
}

export const PageRouter: React.FC = () => {
  // const [account, setAccount] = useState('');
  // const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

return (
  <Connect>

       {(account: string, provider: BrowserProvider) => (
        <>
        <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />

        <Routes>
        <Route path="/whathow" element={<WhatHow/>} />
        <Route path="/major/*" element={<Major provider={provider} />} />
        <Route path="/umission" element={<UMission />} />
        <Route path="/dmission" element={<DMission />} />
        <Route path="/hmission" element={<HMission />} />
        <Route path="/askaccess" element={<AskAccess />} />
      </Routes>
      </>

      )}
      
  </Connect>
  
  );
}
        