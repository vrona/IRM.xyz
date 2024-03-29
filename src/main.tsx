import React from 'react';

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


// Override console.log if it's not a function
if (typeof console.log !== 'function') {
  console.log = function () {};
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <App />
  </React.StrictMode>
)
/*
const Root: React.FC = () => {

  return (
    <React.StrictMode>

      <Welcome />
 
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Root />
);
*/
