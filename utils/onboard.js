import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
// import fortmaticModule from '@web3-onboard/fortmatic'

import NMAicon from '../NMAicon'

const RPC_URL = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL

// const fortmatic = fortmaticModule({
//   apiKey: process.env.NEXT_PUBLIC_FORTMATIC_KEY
// })

const injected = injectedModule()
const walletConnect = walletConnectModule()
const coinbaseWallet = coinbaseModule()

const initOnboard = init({
  wallets: [injected, walletConnect, coinbaseWallet],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/3f278bfaf5874e62a7e772cc0082fa5c'
    },
    {
      id: '0x5',
      token: 'gETH',
      label: 'Ethereum Goerli Testnet',
      rpcUrl: 'https://Goerli.infura.io/v3/3f278bfaf5874e62a7e772cc0082fa5c'
    }
  ],
  appMetadata: {
    name: 'NΞuralMix Art',
    icon: NMAicon,
    description: 'AI artworks NFT collection',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ],
    agreement: {
      version: '1.0.0',
      termsUrl: 'https://www.blocknative.com/terms-conditions',
      privacyUrl: 'https://www.blocknative.com/privacy-policy'
    },
    gettingStartedGuide: 'https://blocknative.com',
    explore: 'https://blocknative.com'
  }
})


export { initOnboard }
