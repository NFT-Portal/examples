<p align="center">
  <img src="https://user-images.githubusercontent.com/18316594/159810202-2b70920c-7fe1-4689-a1d5-e6571433395e.png" />
</p>

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>

---

<h2 align="center">Portal Wallet</h2>
<p align="center">🔐 <b>Interact with NFTs within the Portal ecosystem</b></p>

---

<p align="center">
  <b>Please note that this project is under active development. APIs might change before version 1 is released.</b>
</p>

## Introduction

This package exposes wallet API functions and useful utility functions for handling NFTs within the Portal ecosystem. The following functions this package exposes are:

- getAllOwnedNfts
- getOwnedNftsInCollection
- claimNft

## Examples with API

### getAllOwnedNfts

`getAllOwnedNfts` literally gets all NFTS owned by the calling agent. 

To use `getAllOwnedNfts` in production, it is simply a matter of calling it like below. By default, this searches for owned NFTs within Entrepot market place, which will contain Portal NFT collections as well in the future.

```ts
import { useAuthentication } from '@nft-portal/providers';
import { getAllOwnedNfts } from '@nft-portal/wallet';

// An authenticated agent of your choice. You are not restricted
// to using Portal's method of authentication
const { agent } = useAuthentication(); 

const res = await getAllOwnedNfts(agent);

// prints out a list of NFTs owned by the user the agent represents
console.log(res); 
```

An override exists to specify which NFT collection registry you want to search. Here, you have the option of using Portal's NFT collection registries. 

This is particularly useful for testing within our staging environment. 

```ts
import { useAuthentication } from '@nft-portal/providers';
import { getAllOwnedNfts } from '@nft-portal/wallet';

// An authenticated agent of your choice. You are not restricted
// to using Portal's method of authentication
const { agent } = useAuthentication(); 

// Portal's staging environment NFT collection registry which contains
// a list of staging NFT canisters.
const STAGING_COLLECTION_REGISTRY = 'aaaaa-aa'

const res = await getAllOwnedNfts(agent, {
  nftCollectionRegistryCid: STAGING_COLLECTION_REGISTRY,
});

// prints out a list of NFTs owned by the user in the staging environment
console.log(res); 
```

### getOwnedNftsInCollection

If you only want to get the NFTs belonging to one particular channel you would use `getOwnedNftsInCollection.`

```ts
import { useAuthentication } from '@nft-portal/providers';
import { getOwnedNftsInCollection } from '@nft-portal/wallet';

// An authenticated agent of your choice. You are not restricted
// to using Portal's method of authentication
const { agent } = useAuthentication(); 

// NOTE: the NFT collection canister is a separated entity to the Channel canister. Your channel
// will create an NFT collection canister and it is this canister which is used for this api.
const nftCollectionCid = 'aaaaa-aa'

const res = await getOwnedNftsInCollection(agent, nftCollectionCid);

// prints out a list of NFTs owned by the user in that one particular NFT Collection, regardless of staging
// or production environment.
console.log(res); 
```

### Claim NFT
 
If a channel has the "Free to claim" config flag turned on, then users are able to claim one NFT each.
Below is an example of how to use it in a react component.

```ts
import { useAuthentication } from '@nft-portal/providers';
import { claimNft } from '@nft-portal/wallet';
import React from 'react';

import { SolidButton } from './Buttons';

export const ClaimButton = () => {
  const { agent } = useAuthentication();

  const CHANNEL_CANISTER_ID = 'aaaaa-aa';
  const onClick = async () => {
    try {
      const res = await claimNft(agent, CHANNEL_CANISTER_ID_TWO);
      // Prints out the tokenId of the claimed NFT
      console.log(res);
    } catch (e) {
      // Will fail if there are no NFTs left to claim, if the user already has an NFT (limited 1 per person)
      // or if the channel is not configured to give out NFTs for free.
      console.error(e);
    };
  }
  return (
    <SolidButton
      onClick={onClick}
      label="Claim your free NFT"
    />
  );
};
```

It should be noted that this function is a wrapper around one of the @nft-portal/portal-sdk clients.

## NFT wallet example

Below is one way to make a in app NFT wallet.

```ts

import { HttpAgent } from '@dfinity/agent';
import { useEffect, useState } from 'react';

import { getAllOwnedNfts } from '../apis';
import { NftDetails } from '../types';

export const useWallet = (agent: HttpAgent) => {
  const [nfts, setNfts] = useState<NftDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchNfts = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const nfts = await getAllOwnedNfts(agent);
        setNfts(nfts);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchNfts();
  }, [agent]);

  return {
    nfts,
    isLoading,
    isError,
  };
};
```

