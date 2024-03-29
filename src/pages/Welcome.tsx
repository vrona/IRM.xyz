import React from 'react';
import { Connect } from '../components/Connect';
export const WelcomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to our app!</h1>
      <p>Please connect your wallet to access other features.</p>

      <Connect>{() => null}</Connect>
    </div>
  );
}