import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuthentication } from '@nft-portal/providers';

function App() {
  const { principal, isAuthed, login, logout } = useAuthentication();

  const greeting = isAuthed
    ? `Hello, ${principal?.toString()}!`
    : 'Please login...';

  return (
    <div className="container">
      {greeting}
      <button onClick={isAuthed ? logout : login}>
        {isAuthed ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}

export default App;
