<p align="center">
  <img src="https://user-images.githubusercontent.com/18316594/159810202-2b70920c-7fe1-4689-a1d5-e6571433395e.png" />
</p>

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>

---

<h2 align="center">Example: Portal Wallet API</h2>
<p align="center">🔐 <b>Interact with NFTs within the Portal ecosystem</b></p>

---

<p align="center">
  <b>Please note that this project is under active development. APIs might change before version 1 is released.</b>
</p>

## Introduction

Users can view the NFTs they own using the API in the `@nft-portal/wallet` package. 

This example shows how the API can be used in an application.

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

Install Portal context providers and wallet:

```sh
npm install @nft-portal/providers
npm install @nft-portal/wallet
```

or

```sh
yarn add @nft-portal/providers
yarn add @nft-portal/wallet
```

### Step 3

Set up the Authenticator as demonstrated in [Authorization](../authorization/).

### Step 4

Use the authenticated agent in the API functions as shown [here](./src/components/Wallet.tsx)
