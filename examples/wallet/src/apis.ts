import { HttpAgent } from '@dfinity/agent';
import { EXT721, PINftCollection, PINonfungible } from '@nft-portal/portal-sdk';

import {
  GetAllOwnedNftsConfig,
  NftDetails,
  OwnedTokenExtensionData,
  PortalCollectionDetails,
} from './types';
import { generatetokenIdentifier, principalToAccountIdentifier } from './utils';

const ENTROPOT_MADDIES_API =
  'https://us-central1-entrepot-api.cloudfunctions.net/api/maddies';

const getAllEntrepotNfts = async (accountId: string) => {
  const response = await fetch(
    ENTROPOT_MADDIES_API + '/getAllNfts/' + accountId,
  );
  return (await response.json()) as NftDetails[];
};

const tokenOwnershipResponseToNftDetails =
  (collectionCid: string, accountId: string) =>
  (tokenData: OwnedTokenExtensionData): NftDetails => {
    const tokenId = generatetokenIdentifier(collectionCid, tokenData[0]);
    return {
      tokenId,
      canisterId: collectionCid,
      imageUrl: `https://${collectionCid}.raw.ic0.app/?type=thumbnail&tokenid=${tokenId}`,
      owner: accountId,
    };
  };

const getAllPortalNfts = async (
  agent: HttpAgent,
  collectionRegistry: string,
) => {
  // Get tokens belonging to user for each Nft collection in Portal's NFT collection registry.
  const collections: PortalCollectionDetails[] = (
    await PINftCollection.client(
      collectionRegistry,
    ).getAllCollections_PINftCollection()
  ).map((collection) => ({
    canisterId: collection.id.toString(),
    collectionName: collection.name,
  }));

  const accountId = principalToAccountIdentifier(await agent.getPrincipal());
  const queries: Promise<EXT721.Result & PortalCollectionDetails>[] =
    collections.map(async (collection) => {
      const actor = await EXT721.client(collection.canisterId, agent);
      try {
        const res = await actor.tokens_ext(accountId);
        return {
          ...res,
          canisterId: collection.canisterId,
          collectionName: collection.collectionName,
        };
      } catch (e) {
        throw e;
      }
    });
  const queryResults = await Promise.allSettled(queries);

  // Convert query results into a list of NFTs for usage in the app
  const nftsList: NftDetails[] = queryResults.reduce((prev, current) => {
    // Ignore rejected promises
    if (current.status === 'rejected' || 'err' in current.value) {
      return prev;
    }
    const resData = current.value;

    const nfts: NftDetails[] = resData.ok.map(
      tokenOwnershipResponseToNftDetails(resData.canisterId, accountId),
    );
    return [...prev, ...nfts];
  }, [] as NftDetails[]);
  return nftsList;
};

const getOwnedNftsInCollection = async (
  agent: HttpAgent,
  cid: string,
): Promise<NftDetails[]> => {
  const accountId = principalToAccountIdentifier(await agent.getPrincipal());
  const actor = await EXT721.client(cid, agent);
  const res = await actor.tokens_ext(accountId);
  // Endpoint returns error on no tokens owned
  if ('err' in res) {
    return [] as NftDetails[];
  }
  return res.ok.map(tokenOwnershipResponseToNftDetails(cid, accountId));
};

const getAllOwnedNfts = async (
  agent: HttpAgent,
  config?: GetAllOwnedNftsConfig,
): Promise<NftDetails[]> => {
  const { nftCollectionRegistryCid = '' } = config || {};

  const accountId = principalToAccountIdentifier(await agent.getPrincipal());

  let nfts: NftDetails[] = [];
  if (nftCollectionRegistryCid) {
    nfts = await getAllPortalNfts(agent, nftCollectionRegistryCid);
  } else {
    nfts = await getAllEntrepotNfts(accountId);
  }
  return nfts;
};

const claimNft = async (agent: HttpAgent, channelCid: string) => {
  const actor = await PINonfungible.client(channelCid, agent);
  const res = await actor.claimNFT_PINonfungible();
  if ('err' in res) {
    throw new Error(JSON.stringify(res.err));
  }
  return res.ok;
};

export { claimNft, getAllOwnedNfts, getOwnedNftsInCollection };
