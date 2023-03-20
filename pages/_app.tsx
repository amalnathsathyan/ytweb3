import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { LivepeerConfig } from "@livepeer/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ThemeProvider } from '../utils';
import { Toaster } from 'react-hot-toast';
import { ApolloProvider } from '@apollo/client';
import { apolloClient, LivePeerClient } from '../clients';
import { polygonMumbai } from '@wagmi/chains';

const { chains, provider } = configureChains([polygonMumbai], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Ourtube",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ThemeProvider>
          <ApolloProvider client={apolloClient}>
            <LivepeerConfig client={LivePeerClient}>
              <Component {...pageProps} />
              <Toaster />
            </LivepeerConfig>
          </ApolloProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
