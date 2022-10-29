import { useState, useEffect } from 'react'
import { initOnboard } from '../utils/onboard'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { config } from '../dapp.config'
import {
  getTotalMinted,
  getMaxSupply,
  isPausedState,
  isPublicSaleState,
  isPreSaleState,
  presaleMint,
  publicMint
} from '../utils/interact'

export default function Mint() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const [maxSupply, setMaxSupply] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMintAmount, setMaxMintAmount] = useState(0)
  const [Price, setPrice] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isPublicSale, setIsPublicSale] = useState(false)
  const [isPreSale, setIsPreSale] = useState(false)

  const [status, setStatus] = useState(null)
  const [mintAmount, setMintAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [onboard, setOnboard] = useState(null)

  useEffect(() => {
    setOnboard(initOnboard)
  }, [])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets])

  useEffect(() => {
    if (!onboard) return

    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true
          }
        })
      }

      setWalletFromLocalStorage()
    }
  }, [onboard, connect])

  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply())
      setTotalMinted(await getTotalMinted())

      setPaused(await isPausedState())
      setIsPublicSale(await isPublicSaleState())
      const isPreSale = await isPreSaleState()
      setIsPreSale(isPreSale)

      setMaxMintAmount(
        isPreSale ? config.presaleMaxMintAmount : config.maxMintAmount
      )
      setPrice(
        isPreSale ? config.presalePrice : config.Price
      )
    }

    init()
  }, [])

  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1)
    }
  }

  const presaleMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await presaleMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }
  const publicMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await publicMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }
  

  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background ">
      

        <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
          <div className="relative z-1 md:max-w-3xl w-full border border-brand-red bg-brand-background filter py-4 rounded-md px-2 md:px-10 flex flex-col items-center">
            {wallet && (
              <button
                className="absolute right-4 bg-brand-red  Montserrat-Light-Alt1  transform hover:scale-105 px-4 py-2 rounded-md  text-brand-background tracking-wide uppercase"
                onClick={() =>
                  disconnect({
                    label: wallet.label
                  })
                }
              >
                Disconnect
              </button>
            )}
            <h1 className="Montserrat-Light-Alt1 uppercase font-bold text-3xl md:text-4xl text-brand-red mt-3">
              {paused ? 'Paused' : isPreSale ? 'Pre-Sale' : 'Public Sale'}
            </h1>
            <h3 className="Montserrat-UltraLight text-sm text-brand-red tracking-widest">
              {wallet?.accounts[0]?.address
                ? wallet?.accounts[0]?.address.slice(0, 8) +
                  '...' +
                  wallet?.accounts[0]?.address.slice(-4)
                : ''}
            </h3>

            <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
              <div className="relative w-full">
                <div className="font-coiny z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-brand-purple rounded-md flex items-center justify-center text-brand-red font-semibold">
                  <p>
                    <span className="text-brand-red">{totalMinted}</span> /{' '}
                    {maxSupply}
                  </p>
                </div>

                <img
                  src="/images/nma.gif"
                  className="object-cover w-full sm:h-[280px] md:w-[250px] rounded-md"
                  alt="sneak peek"
                />
              </div>

              <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-0">
                <div className="font-coiny flex items-center justify-between w-full">
                  <button
                    className="w-14 h-10 md:w-16 md:h-12 transform hover:scale-105 flex items-center justify-center text-brand-  
                    
                    
                    
                    hover:shadow-lg bg-brand-red font-bold rounded-md"
                    onClick={decrementMintAmount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                    
                  </button>

                  <p className="Montserrat-Light-Alt1 flex items-center justify-center flex-1 grow text-center font-bold text-brand-red text-3xl md:text-4xl">
                    {mintAmount}
                  </p>

                  <button
                    className="w-14 h-10 md:w-16 md:h-12 transform hover:scale-105 flex items-center justify-center text-brand-background hover:shadow-lg bg-brand-red font-bold rounded-md"
                    onClick={incrementMintAmount}
                  > 
                   <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>

                <p className="Montserrat-UltraLight text-sm text-brand-red tracking-widest mt-3">
                  Max Mint Amount: {maxMintAmount}
                </p>

                <div className="border-t border-b border-brand-red py-4 mt-16 w-full">
                  <div className="w-full text-xl Montserrat-UltraLight text-brand-red flex items-center justify-between">
                    <p>Total</p>

                    <div className="flex items-center space-x-3">
                      <p>
                        {Number.parseFloat(Price * mintAmount).toFixed(
                          3
                        )}{' '}
                        ETH
                      </p>{' '}
                      <span className="text-brand-red">+ GAS</span>
                    </div>
                  </div>
                </div>

                {/* Mint Button && Connect Wallet Button */}
                {wallet ? (
                  <button
                    className={` ${
                      paused || isMinting
                        ? 'bg-brand-red cursor-not-allowed'
                        : 'bg-brand-red'
                    }  Montserrat-Light-Alt1 mt-12 w-full px-6 py-3 rounded-md text-2xl transform hover:scale-105 text-brand-backgrown  mx-4 tracking-wide uppercase`}
                    disabled={paused || isMinting}
                    onClick={isPreSale ? presaleMintHandler : publicMintHandler}
                  >
                    {isMinting ? 'Minting...' : 'Mint'}
                  </button>
                ) : (
                  <button
                    className=" Montserrat-Light-Alt1 mt-12 w-full transform hover:scale-105 bg-brand-red  px-6 py-3 rounded-md text-2xl text-brand-backgrown mx-4 tracking-wide uppercase"
                    onClick={() => connect()}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>

            {/* Status */}
            {status && (
              <div
                className={`border ${
                  status.success ? 'border-green-500' : 'border-brand-red '
                } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
              >
                <p className="flex flex-col space-y-2 text-brand-red text-sm md:text-base break-words ...">
                  {status.message}
                </p>
              </div>
            )}

            {/* Contract Address */}
            <div className="border-t Montserrat-UltraLight text-sm border-brand-red flex flex-col items-center mt-10 py-2 w-full">
              <h3 className="Montserrat-Ultralight text-xl text-brand-red uppercase mt-6">
                Contract Address
              </h3>
              <a
                href={`https://Goerli.etherscan.io/address/${config.contractAddress}#readContract`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red  mt-4"
              >
                <span className=" text-sm break-all ...">{config.contractAddress}</span>
              </a>
            </div>
          </div>
        </div>
    </div>
  )
}
