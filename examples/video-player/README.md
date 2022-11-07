<p align="center">
  <img src="https://user-images.githubusercontent.com/18316594/159810202-2b70920c-7fe1-4689-a1d5-e6571433395e.png" />
</p>

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>

---

<h2 align="center">Example: Embed Video</h2>
<p align="center">🎥 <b>Common recipes required for providing high quality video streaming in your React app</b></p>

---

<p align="center">
  <b>Please note that this project is under active development. APIs might change before version 1 is released.</b>
</p>

## Embed Video

The first and most basic integration is to play video from your Portal video channel on your website.

### Requirements:

1. Portal video channel
2. A video hosted on your Portal channel with the access set to public
3. The Portal Player React component from npm

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

Install Portal Player:

```sh
npm install @nft-portal/portal-player
```

or

```sh
yarn add @nft-portal/portal-player
```

### Step 3

Add Portal Player component to app and point it at your public video:

```tsx
import React from 'react';
import './App.css';
import { PortalPlayer } from '@nft-portal/portal-player';

function App() {
  return (
    <PortalPlayer
      cid="sdee3-myaaa-aaaag-aaw2q-cai" // the canister id holding the master playlist
      contentId="97adc6dc-1306-4374-a7d6-50f35ecd5161" // the content id of the video
    />
  );
}

export default App;
```
