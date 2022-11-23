import React, { useState, useEffect } from 'react';
import { useAuthentication } from '@nft-portal/providers';
import {
  claimNft,
  getAllOwnedNfts,
  getOwnedNftsInCollection,
  NftDetails,
} from '@nft-portal/wallet';

const PORTAL_STAGING_NFT_COLLECTION_REGISTRY = 'wzsuw-xaaaa-aaaag-aa2pa-cai';

const PORTAL_STAGING_CHANNEL = 'wjugv-saaaa-aaaag-aawaa-cai';

const PORTAL_STAGING_NFT_COLLECTION = 'wovab-7yaaa-aaaag-aawaq-cai';

const Wallet = () => {
  const { agent } = useAuthentication();
  const [allNfts, setAllNfts] = useState<NftDetails[]>([]);
  const [nftsInCollection, setNftsInCollection] = useState<NftDetails[]>([]);

  useEffect(() => {
    const fetchNfts = async () => {
      // overide config for staging environment
      const nfts = await getAllOwnedNfts(agent, {
        nftCollectionRegistryCid: PORTAL_STAGING_NFT_COLLECTION_REGISTRY,
      });
      setAllNfts(nfts);
    };
    const fetchNftsInCollection = async () => {
      const nfts = await getOwnedNftsInCollection(
        agent,
        PORTAL_STAGING_NFT_COLLECTION,
      );
      setNftsInCollection(nfts);
    };

    fetchNfts();
    fetchNftsInCollection();
  }, [agent]);

  const onClick = async () => {
    try {
      console.log('Attempting to claim NFT...');
      const res = await claimNft(agent, PORTAL_STAGING_CHANNEL);
      console.log('You are now the owner of the token: ', res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {allNfts.map((meta) => (
        <div
          style={{
            height: '200px',
            width: '200px',
            backgroundImage: `url(${meta.imageUrl})`,
            backgroundSize: 'cover',
          }}
        />
      ))}
      <p>
        Total number of NFTs owned in Portal staging environment:{' '}
        {allNfts.length}
      </p>
      <p>
        NFTs owned in Portal staging NFT collection: {nftsInCollection.length}
      </p>
      <button onClick={onClick}>Attempt to Claim NFT</button>
    </div>
  );
};

export default Wallet;
