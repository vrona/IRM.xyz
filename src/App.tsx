import { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import { init } from './fhevmjs';
import './App.css';
import { Connect } from './components/Connect';


import { PageRouter } from './components/PageRouter'; 
import { WelcomePage } from './pages/Welcome';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [provider, _] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));
  }, []);

  if (!isInitialized) return null;

  return (
    <Router>
      <Routes>
        {/* Render WelcomePage if the provider is not available */}
        {!provider && <Route path="/" element={<WelcomePage />} />}
        {/* Render Connect component and other routes */}
        <Route path="/" element={<Connect>{(account, provider) => <PageRouter provider={provider} />}</Connect>} />
      </Routes>
    </Router>
  );
}

export default App;