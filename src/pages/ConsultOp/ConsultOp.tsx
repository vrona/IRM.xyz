import { useEffect, useState } from 'react';
import { Connect } from "../../components/Connect";
import { BrowserProvider } from 'ethers/providers';

interface ConsultOpProps {
    provider: BrowserProvider;
}
export const ConsultOp: React.FC <ConsultOpProps> = ({provider}) => {
  
  return (<Connect>
    {(account, provider) => (
    
    <h1>Consult Operation Docs</h1>

   
    )}
     </Connect>
  );
};