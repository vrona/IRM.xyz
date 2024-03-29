import { Connect } from '../../components/Connect';

import './AskAccess.css';

  
export const AskAccess = () => {

    return (
    <div>
        <h1 className='title-header'>
        Access Denied
        </h1>
        <p className="description">
        No ranking detected -- Contact Major at HQ.
        </p>
      <Connect>{() => null}</Connect>
    </div>
  );
}