import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthenticationProvider, buildNFID } from '@nft-portal/providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Configure App specific properties
const identityProvider = buildNFID({
  appName: 'Sample Dapp',
  appLogo: 'https://yjp7w-nqaaa-aaaag-aaejq-cai.raw.ic0.app/portal.png',
});

root.render(
  <React.StrictMode>
    <AuthenticationProvider
      maxTimeToLive={BigInt(36_000_000)}
      identityProvider={identityProvider}
      width={525}
      height={705}>
      <App />
    </AuthenticationProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
