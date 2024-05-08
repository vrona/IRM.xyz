import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import { init } from './fhevmjs';
import './App.css';
import Welcome  from './pages/Welcome/Welcome';

import { PageRouter } from './components/PageRouter'; 

interface AppProps {
  provider: BrowserProvider;
}

// function App() 
function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));

      const eth = window.ethereum;
    if (!eth) {
      setIsConnected(false);
      console.log('No wallet has been found');
      
    } else {
      setIsConnected(true);
      console.log('Wallet found');
      
    }
      

  }, []);

  if (!isInitialized) return null;

   return (
      <Router>
        <Routes>
        {!isConnected || (<Route path="/" element={<Welcome />} />)}
        {isConnected && (<Route path="/conn/*" element={<PageRouter />}/>)}
        </Routes>
      </Router>
    );}
     
export default App;

{/* /*
    // <Connect>
      
    //   {(account: string, provider: BrowserProvider) => (
           // </Connect> 
        <Router>
           {provider ? <Navigate to="/conn" /> : <Welcome />}
          <Routes>
          {!provider && <Route path="/" element={<Welcome />} />}
          {provider && <Navigate to="/conn" replace />}

{!isConnect && <Route path="/" element={<Welcome />} />}*/}