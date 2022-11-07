<p align="center">
  <img src="https://user-images.githubusercontent.com/18316594/159810202-2b70920c-7fe1-4689-a1d5-e6571433395e.png" />
</p>

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>

---

<h2 align="center">Example: Authorization</h2>
<p align="center">🎥 <b>Common recipes required for providing high quality video streaming in your React app</b></p>

---

<p align="center">
  <b>Please note that this project is under active development. APIs might change before version 1 is released.</b>
</p>

## Authenticate Users

In order to use more advanced features such as token ownership, transfers, and gating content, the viewer must be authenticated.

This example demonstrates a quick and easy way to setup auth in your current app.

### Requirements:

1. The Portal Provider package from npm
2. Your Portal channel id

### Step 1

Create a new CRA project:

```sh
npx create-react-app my-app --template typescript
```

or

```sh
yarn create react-app my-app --template typescript
```

### Step 2

Install Portal context providers:

```sh
npm install @nft-portal/providers
```

or

```sh
yarn add @nft-portal/providers
```

### Step 3

Wrap the app in the Authentication context provider:

```tsx
import { AuthenticationProvider, buildNFID } from '@nft-portal/providers';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Configure App specific properties
const identityProvider = buildNFID({
  appName: 'Portal',
  appLogo: 'https://yjp7w-nqaaa-aaaag-aaejq-cai.raw.ic0.app/portal.png',
});

root.render(
  <React.StrictMode>
    <AuthenticationProvider
      maxTimeToLive={36_000_000n}
      identityProvider={identityProvider}
      width={525}
      height={705}>
      <App />
    </AuthenticationProvider>
  </React.StrictMode>,
);
```

### Step 4

Add a button and attach the `login` method to it.

The authentication provider exposes the users Principal ID and a property `isAuthed` that indicates whether or not the user is anonymous or not.

We've also added a simple container class to center the content.

```tsx
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
```

### Step 5

Now that you have an authenticated user you can make calls to canisters running on the IC.

Below is a demonstration of how you could use your authenticated user and the Portal SDK to perform actions that require authorization.

```tsx
import { useAuthentication } from '@nft-portal/providers';
import React from 'react';

const cid = 'wjugv-saaaa-aaaag-aawaa-cai';

export const App = () => {
  const { isAuthed, agent } = useAuthentication();

  useEffect(() => {
    // getInterfaces does not require any special
    // privileges so you can leave out the agent
    // and a default one will be created
    const getInterfaces = async () => {
      const client = PI.client(cid);
      const res = await client.getInterfaces_PI();
      console.log(res);
    };

    // getAdmin requires admin privileges
    // so an agent must be authorized and
    // provided
    const getAdmin = async () => {
      const client = PIAdmin.client(cid, agent);
      const res = await client.getAdmin_PIAdmin();
      console.log(res);
    };

    getInterfaces();

    if (isAuthed) {
      getAdmin();
    }
  }, [agent, isAuthed]);

  return <p>Do something with data...</p>;
};
```
