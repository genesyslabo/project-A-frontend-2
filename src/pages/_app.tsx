import {ChakraProvider, ChakraProviderProps, useColorMode} from '@chakra-ui/react'

import {theme} from '../theme'
import {AppProps} from 'next/app'
import "../style/global.css"
import Head from 'next/head'

import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useEffect } from 'react'

function MyApp({Component, pageProps}: AppProps) {
  const { colorMode } = useColorMode();

  const { chains, provider } = configureChains(
    [bscTestnet, bsc],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'cnmb',
    projectId: '5e11f3f7e6b29093952056699fabe64c',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  useEffect(() => {
    console.log("Theme mode:", colorMode);
  }, [colorMode]);

  return (
    <>
      <Head>
        <title></title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      {/* <Provider store={store}> */}
      <ChakraProvider theme={theme} toastOptions={{ 
          defaultOptions: {
            position: 'top-right',
            isClosable: true,
          },
          // component: (props) => { console.log(props); return (<CustomToast props={props} />)}
          
        }}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider modalSize="compact"
            showRecentTransactions={true}
            chains={chains}
            initialChain={bscTestnet}
            theme={ darkTheme() }>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
      {/* </Provider> */}
    </>
  )
}

export default MyApp
