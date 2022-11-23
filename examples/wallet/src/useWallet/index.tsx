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
