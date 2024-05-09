import React,{ useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { Route, Routes, NavLink, useLocation} from 'react-router-dom';
import './Major.css';

import { Connect } from '../../components/Connect';
import { CreateOp } from '../../components/CreateOp';
import { ModifyOp } from '../../components/ModifyOp';
import { RightMgt } from '../../components/RightMgt';

interface MajorProps {
  provider: BrowserProvider;
}
export const Major: React.FC<MajorProps> = () => {
  const location = useLocation();
  return (

  <Connect>
    {(account: string, provider: BrowserProvider) =>(

        <div>
          <div className='title'style={{ position: location.pathname === '/conn/major' ? 'relative' : 'absolute',
          top: location.pathname === '/conn/major' ? '50%' : '400px',
          left: location.pathname === '/conn/major' ? '50%' : '200px',
          transform: location.pathname === '/conn/major' ? 'translate(-50%, -50%)' : 'none' }}>
          <h1> MAJOR</h1>
          <div className='subtitle'> 
          <h3>
          <NavLink to="/conn/major/rightsmgt">manages rights</NavLink>
          </h3>

          <h3>
          <NavLink to="/conn/major/createop">creates operations</NavLink>
          </h3>
    
          <h3>
          <NavLink to="/conn/major/modifop">activates/modifies operations</NavLink>
          </h3>
          </div>
          </div>


        <Routes>
          <Route path='/rightsmgt' element = {<RightMgt provider={provider} />} />
          <Route path='/createop' element = {<CreateOp provider={provider}/>} />
          <Route path='/modifop' element = {<ModifyOp provider={provider} />} />
        </Routes>
      </div>

      )}
    </Connect>
  );
}