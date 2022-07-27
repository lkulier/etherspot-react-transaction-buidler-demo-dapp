import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Etherspot, TRANSACTION_BLOCK_TYPE } from '@etherspot/react-transaction-buidler';
import { ethers } from 'ethers';
import Onboard from 'bnc-onboard';
import styled from 'styled-components';

const wallets = [
  { walletName: "metamask", preferred: true },
];

// @ts-ignore
const WalletService = (onProvider) => Onboard({
  walletSelect: { wallets },
  subscriptions: {
    wallet: ({ provider }) => {
      onProvider(provider);
    },
  },
  networkId: 1,
});

const Paragraph = styled.p`
  font-size: 14px;
  margin-bottom: 40px;
  font-family: "Arial", sans;
`;

const ConnectWalletButton = styled.span`
  padding: 10px;
  border: 1px solid #000;
  text-transform: uppercase;
  font-size: 12px;
  margin-right: 20px;
  font-family: "Arial", sans;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
  }
`;

const App = () => {
  const [connectedProvider, setConnectedProvider] = useState(null);

  const walletService = useMemo(() => WalletService(
    // @ts-ignore
    (provider) => {
      if (provider) {
        // @ts-ignore
        setConnectedProvider(provider);
      }
    },
  ), []);

  const connectWithExternal = useCallback(async () => {
    await walletService.walletSelect().catch(() => null);
    await walletService.walletCheck().catch(() => null);
  }, [walletService]);

  const connectWithKeyBased = useCallback(() => {
    const wallet = ethers.Wallet.createRandom();
    // @ts-ignore
    setConnectedProvider(wallet);
  }, []);

  return (
    <>
      {!connectedProvider && (
        <>
          <Paragraph>Connect part showcases how any dapp maintained web3 connector can interact with Etherspot transaction builder component directly</Paragraph>
          <ConnectWalletButton onClick={connectWithExternal}>Connect with external wallet</ConnectWalletButton>
          <ConnectWalletButton onClick={connectWithKeyBased}>Connect with random Key Based</ConnectWalletButton>
        </>
      )}
      {connectedProvider && (
        <div>
          <Etherspot
            defaultTransactionBlocks={[{ type: TRANSACTION_BLOCK_TYPE.ASSET_BRIDGE_TRANSACTION }]}
            provider={connectedProvider}
          />
        </div>
      )}
    </>
  );
}

export default App;
