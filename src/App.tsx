import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import { init } from './fhevmjs';
import './App.css';
import { Connect } from './components/Connect';
import Welcome  from './pages/Welcome/Welcome';


import { PageRouter } from './components/PageRouter'; 

interface AppProps {
  provider: BrowserProvider;
}

// function App() 
function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));
      

  }, []);


  if (!isInitialized) return null;

   return (

    <Connect>
      
      {(account: string, provider: BrowserProvider) => (
        <Router>
        <Routes>

            <Route 
              path="/conn/*"
              element={<PageRouter provider={provider} />}
            />
          </Routes>
        </Router>
      )}
     
    </Connect>
  );
  }
export default App;

/*
        <Router>
           {provider ? <Navigate to="/conn" /> : <Welcome />}
          <Routes>
          {!provider && <Route path="/" element={<Welcome />} />}
          {provider && <Navigate to="/conn" replace />}

{!isConnect && <Route path="/" element={<Welcome />} />}*/