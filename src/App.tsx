import { useMemo, useState } from 'react';
import { Etherspot, TRANSACTION_BLOCK_TYPE } from '@etherspot/react-transaction-buidler';
import styled, { createGlobalStyle } from 'styled-components';
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';


const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [infuraProvider({ apiKey: process.env.REACT_APP_INFURA_ID ?? '' }), publicProvider()],
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Etherspot Buidler',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});


const chainId = 1;

const GlobalStyle = createGlobalStyle`
  body {
    background: #191726;
  }

  * {
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const ToggleThemeButton = styled.span`
  padding: 10px;
  display: inline-block;
  border: 1px solid #fff;
  text-transform: uppercase;
  font-size: 12px;
  margin-right: 20px;
  font-family: 'Arial', sans;
  cursor: pointer;
  margin-bottom: 15px;
  color: #fff;

  &:hover {
    opacity: 0.4;
  }
`;

const App = () => {
  const [useDashboardTheme, setUseDashboardTheme] = useState(false);

  const themeOverride = useMemo(() => {
    if (!useDashboardTheme) return undefined;
    return {
      color: {
        background: {
          main: 'linear-gradient(to right, #f43b40, #f8793f)',
          card: '#fff7f2',
          tokenBalanceContainer: '#21002e',
          horizontalLine: 'linear-gradient(90deg, #23a9c9, #cd34a2)',
          topMenu: '#fff',
          topMenuButton: '#fff',
          selectInput: '#fff',
          selectInputExpanded: '#fff',
          selectInputScrollbar: '#ff7733',
          selectInputScrollbarHover: 'rgba(255, 119, 51, 0.8)',
          selectInputScrollbarActive: 'rgba(255, 119, 51, 0.5)',
          selectInputImagePlaceholder: '#ffe6d9',
          selectInputToggleButton: '#0a1427',
          textInput: '#ffe6d9',
          switchInput: '#ffd2bb',
          switchInputActiveTab: '#fff',
          switchInputInactiveTab: 'transparent',
          button: '#fff',
          closeButton: '#0a1427',
          pill: '#fff7f2',
          roundedImageFallback: '#ffe6d9',
          listItemQuickButtonSecondary: '#443d66',
          listItemQuickButtonPrimary: '#ff884d',
          statusIconSuccess: '#1ba23d',
          statusIconPending: '#ff6b35',
          statusIconFailed: '#ff0000',
          checkboxInputActive: '#ff884d',
          checkboxInputInactive: '#7f7a99',
          dropdownHoverColor: '#F8EFEA',
          selectInputExpandedHover: '#F8EFEA',
          toDropdownColor: '#F8EFEA',
          secondary: '#9889e4',
          selectInputRadioOn: '#ff7733',
          selectInputRadioOff: '#F8EFEA',
          walletButton: 'linear-gradient(to bottom, #fd9250, #ff5548)',
          walletChainDropdown: '#fff',
          walletChainButtonActive: '#ffeee6',
          signInBackground: 'linear-gradient(166deg, #ff8932 9%, #f44c3c 97%)',
          signInBackgroundBorder: '#f53f40',
          signInOption: 'rgba(255, 255, 255, 0.25)',
          signInOptionBorder: '#ff966b',
          signInSocialLoginBorder: '#ff966b',
          signInOptionTabActive: 'linear-gradient(to bottom, #f76b3f, #f43f40)',
          signInOptionTabActiveBorder: '#f43f40',
          signInOptionWrapper: '#fb9267',
        },
        text: {
          main: '#fff',
          topBar: '#fff',
          topMenu: '#191726',
          cardTitle: '#191726',
          card: '#000',
          cardDisabled: '#ddd',
          tokenBalance: '#fefefe',
          tokenValue: '#57c2d6',
          tokenTotal: '#ff0065',
          innerLabel: '#6e6b6a',
          outerLabel: '#6e6b6a',
          reviewLabel: '#5fc9e0',
          selectInput: '#000',
          selectInputOption: '#191726',
          selectInputOptionSecondary: '#191726',
          selectInputImagePlaceholder: '#6e6b6a',
          textInput: '#000',
          textInputSecondary: '#6e6b6a',
          switchInputActiveTab: '#191726',
          switchInputInactiveTab: '#6e6b6a',
          button: '#191726',
          buttonSecondary: '#ffeee6',
          errorMessage: '#ff0000',
          searchInput: '#ff7733',
          searchInputSecondary: '#ff7733',
          pill: '#6e6b6a',
          pillValue: '#191726',
          roundedImageFallback: '#6e6b6a',
          listItemQuickButtonSecondary: '#fff',
          listItemQuickButtonPrimary: '#fff',
          transactionStatusLink: '#ff7733',
          pasteIcon: '#ff884d',
          settingsIcon: '#ee6723',
          walletDropdownIcon: '#221f33',
          showMoreOrLessOption: '#fff',
          signInTitle: '#fff',
          signInOptionTabInactive: '#fff',
          signInOptionTabActive: '#fff',
        },
      },
    };
  }, [useDashboardTheme]);
  return (
    <WagmiConfig client={client}>
      <GlobalStyle />
      <Wrapper>
          <div>
          <ToggleThemeButton onClick={() => setUseDashboardTheme(!useDashboardTheme)}>Toggle theme</ToggleThemeButton>
            <Etherspot
              defaultTransactionBlocks={[{ type: TRANSACTION_BLOCK_TYPE.ASSET_BRIDGE }]}
              chainId={chainId}
              themeOverride={themeOverride}
              showMenuLogout
            />
          </div>
      </Wrapper>
    </WagmiConfig>
  );
};

export default App;
