import React,{ useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { Route, Routes, NavLink} from 'react-router-dom';
import './Major.css';

import { Connect } from '../../components/Connect';
import { CreateOp } from '../../components/CreateOp';
import { ModifyOp } from '../../components/ModifyOp';
import { RightMgt } from '../../components/RightMgt';
import { Cube } from '../../components/Cube';

interface MajorProps {
  provider: BrowserProvider;
  path: string;
}
export const Major: React.FC<MajorProps> = ({ path }) => {

  return (

  <Connect>
    {(account: string, provider: BrowserProvider) =>(

        <div>
          <div className='title'>
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