import { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { init } from './fhevmjs';
import './App.css';
import { HomePage } from './pages/HomePage';
import { Major } from './pages/Major';
import { UMission } from './pages/UMission';
import { DMission } from './pages/DMission';
import { HMission } from './pages/HMission';

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
    <Router>
      <Routes>
        
        {/* Render each Route component individually */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/major" element={<Major/>} />
        <Route path="/umission" element={<UMission/>} />
        <Route path="/dmission" element={<DMission/>} />
        <Route path="/hmission" element={<HMission/>} />
      <Route/>
      </Routes>
    </Router>
  );
}



export default App;
