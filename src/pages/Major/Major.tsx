import React,{ useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { Route, Routes, Link} from 'react-router-dom';
import './Major.css';

import { Connect } from '../../components/Connect';
import { CreateOp } from '../../components/CreateOp';
import { ModifyOp } from '../../components/ModifyOp';
import { RightMgt } from '../../components/RightMgt';


interface MajorProps {
  provider: BrowserProvider;
  path: string;
}
export const Major: React.FC<MajorProps> = ({ path }) => {

  return (
  <Connect>
    {(account: string, provider: BrowserProvider) =>(

      <div>
        <nav>
          <dt>
            {!path.endsWith('/rightsmgt') && (
            <dd>
              <Link to={`${path}/rightsmgt`}>Rights Management</Link>
            </dd>
             )}
             {!path.endsWith('/createop') && (
            <dd>
              <Link to={`${path}/createop`}>Create Operation</Link>
            </dd>
            )}
            {!path.endsWith('/modifop') && (
            <dd>
              <Link to={`${path}/modifop`}>Operation Details</Link>
            </dd>
            )}
          </dt>
        </nav>

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

/* 

<dd>
              <Link to="/modifyop">Modify Operation</Link>
            </dd>
<Route path="/modifyop">
  <ModifyOp provider={provider} /> 
</Route>
*/
