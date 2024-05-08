import { Connect } from '../../components/Connect';

import './AskAccess.css';

  
export const AskAccess = () => {

    return (
    <div>
        <h1 className='title-header'>
        Access Denied
        </h1>
        <p className="description">
        No ranking detected.<br/>
        Major, please contact VRONA.<br/>
        Officer, Operator, please contact your Major at HeadQuarter.
        </p>

      {/* <div className='connection'>
      <Connect>{() => null}</Connect>
      </div> */}
    </div>
  );
}