import {
  Listing,
  TokenIndex,
} from '@nft-portal/portal-sdk/build/clients/EXT721';

// Response type from Entrepot maddies API
export type NftDetails = {
  canisterId: string;
  tokenId: string;
  imageUrl: string;
  owner: string;
};

export type PortalCollectionDetails = {
  canisterId: string;
  collectionName: string;
};

export type OwnedTokenExtensionData = [
  TokenIndex,
  [] | [Listing],
  [] | [Array<number>],
];

export type GetAllOwnedNftsConfig = {
  nftCollectionRegistryCid: string;
};
