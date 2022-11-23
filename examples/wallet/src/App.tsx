import React from 'react';
import './App.css';
import { useAuthentication } from '@nft-portal/providers';
import LoginButton from './components/LoginButton';
import Wallet from './components/Wallet';

function App() {
  const { isAuthed  } = useAuthentication();
  return (
    <div className="container">
      <LoginButton />
      {isAuthed  && <Wallet /> }
    </div>
  );
}

export default App;

