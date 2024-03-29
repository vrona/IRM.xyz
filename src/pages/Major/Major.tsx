import { useEffect, useState } from 'react';
import { getInstance } from '../../fhevmjs';
import { BrowserProvider } from 'ethers';
import { Route, Routes, Link} from 'react-router-dom';
import './Major.css';
import { JsonRpcProvider } from 'ethers/providers';
import { Connect } from '../../components/Connect'; // Import Connect component

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
          <ul>
            {!path.endsWith('/createop') && (
            <li>
              <Link to={`${path}/createop`}>Create Operation</Link>
            </li>
            )}
            {!path.endsWith('/rightsmgt') && (
            <li>
              <Link to={`${path}/rightsmgt`}>Rights Management</Link>
            </li>
             )}
          </ul>
        </nav>

        <Routes>
          <Route path='/createop' element = {<CreateOp provider={provider}/>} />
          <Route path='/rightsmgt' element = {<RightMgt provider={provider} />} />

        </Routes>
      </div>
      )}
    </Connect>
  );
}

/* 

<li>
              <Link to="/modifyop">Modify Operation</Link>
            </li>
<Route path="/modifyop">
  <ModifyOp provider={provider} /> 
</Route>
*/
