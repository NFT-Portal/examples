import React from 'react';
import { useAuthentication } from '@nft-portal/providers';

const LoginButton = () => {
  const { principal, isAuthed, login, logout } = useAuthentication();

  const greeting = isAuthed
    ? `Hello, ${principal?.toString()}!`
    : 'Please login...';

  return (
    <div>
      {greeting}
      <button onClick={isAuthed ? logout : login}>
        {isAuthed ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}

export default LoginButton;