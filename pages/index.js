import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { config } from '../dapp.config'

export default function Home() {
  return (
    <div className="min-h-screen h-full w-full flex flex-col bg-brand-background overflow-hidden">
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"/>
        
      </Head>

      <header className="min-w-full py-8 px-4 md:px-0">
        <div className="flex items-center container mx-auto max-w-3xl justify-between h-full">
          {/* Logo */}
            <img src="images/logo33.png"/>
        </div>
        <div className="flex flex-wrap mt-4 justify-center space-x-4 md:space-x-12">
            <div>
            <a href="#faq" className="m-6"><img src="images/faq.png" width="45" alt="FAQ" className="transform hover:scale-110" /></a>

            </div>
            <div>
            <a href="https://twitter.com/neuralmixart " className="m-6" target="_blank"><img src="images/twitter3.png" width="45" alt="Official Twitter Page" className="transform hover:scale-110" /></a>

            </div>
            <div className="cursor-not-allowed">
            <a href="" className="m-6 pointer-events-none " target="_blank"><img src="images/discord2.png" width="45" alt="Official Discord Server"  /></a>

            </div>
            <div className="cursor-not-allowed">
            <a href="#" className="m-6 pointer-events-none" target="_blank"><img src="images/opensea.png" width="45" alt="Official Opensea Page"  /></a>

            </div>
            <div className="cursor-not-allowed">
            <a href="#" className="m-6 pointer-events-none" target="_blank"><img src="images/etherscan.png" width="45" alt="Official Contract Page" /></a>

            </div>
          </div>
      </header>

      <div className="h-full w-full container max-w-7xl mx-auto flex flex-col items-center pt-4">
        <div className="flex flex-col items-center max-w-5xl w-full">
          

          <div className="flex flex-col md:flex-row md:space-x-16 space-y-6 items-center mt-2 w-full">
            {/* NeuralMixArt Image */}
            <img
              src="/images/nma.gif"
              className="w-2/5 h-2/5  object-cover"
              alt="sneak peek"
            />

            <div className="flex flex-col  items-center justify-center text-center Montserrat-UltraLight text-brand-red px-4 md:px-0 ">
              <h2 className="font-bold text-2xl md:text-4xl Montserrat-Light-Alt1 uppercase">
                About
              </h2>

              <p className="mt-6 text-lg">
                {`NMA is a collection of 5,000 artworks created with the help of neural networks. 
                We took some top PFPs and reimagined them with inspiration from some well-recognized generative art collections. 
                Then we enhanced the quality of each image to 64MP resolution. 
                This will allow owners to print their NFTs in stunning quality. 
                Below are some sneak peeks in their original size. Be sure to take a look to understand the level of quality.`}
              </p>
              <h2 className="font-bold text-2xl md:text-4xl mt-6 Montserrat-Light-Alt1 uppercase">
                Sneak peeks on IPFS
              </h2>
              <h4 className="font-bold mt-2 Montserrat-Light-Alt1 ">
              (wait until the image is fully downloaded then click to zoom in and check the detail)
              </h4>
              <div className="flex flex-wrap mt-4 justify-center space-x-4 md:space-x-12">
                <div>
                 <a href="https://neuralmixart.mypinata.cloud/ipfs/QmUTsuDfWftTqyMwLC1YinFo1NaYLMhpfCkenbtQUc7H2W" target="_blank" className="font-bold text-2xl Montserrat-Light-Alt1 uppercase m-4">#1</a>
                </div>
                <div>
                 <a href="https://neuralmixart.mypinata.cloud/ipfs/QmNqcSdPjZRMewVPcykRb8xCLCzUk1wQu8bwL4w8dD9NNS" target="_blank" className="font-bold text-2xl Montserrat-Light-Alt1 uppercase m-4">#2</a>
                </div>
                <div>
                 <a href="https://neuralmixart.mypinata.cloud/ipfs/QmWUZcrotu3CRgqeFBHU4F3e8aZTzcHRt7Jo3pkFW9115a" target="_blank" className="font-bold text-2xl Montserrat-Light-Alt1 uppercase m-4">#3</a>
                </div>
                <div>
                 <a href="https://neuralmixart.mypinata.cloud/ipfs/QmdkAqSrcB7gT4zZj6cCFikiDPembK5oEuks8wCtEWNEwC" target="_blank" className="font-bold text-2xl Montserrat-Light-Alt1 uppercase m-4">#4</a>
                </div>
                <div>
                 <a href="https://neuralmixart.mypinata.cloud/ipfs/QmXgcNHN26aJFoAHgaFUqzKG6viRPiE7BtCoefnWDAuze8"  target="_blank"className="font-bold text-2xl Montserrat-Light-Alt1 uppercase m-4">#5</a>
                </div>
                
              </div>
              {/* mntlnk */}
            </div>
          </div>
        </div>
      </div>

      <div id="faq">
      <section className="text-brand-red">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl text-center title-font Montserrat-Light-Alt1 text-brand-red mb-4">
              Frequently Asked Questions
            </h1> 
          </div>
          <div className="flex flex-row lg:w-4/5 sm:mx-auto justify-center Montserrat-Light-Alt1 sm:mb-2 ">
            <div className="w-full max-w-7xl  py-2">
            <details className="mb-4">
                <summary className="font-semibold border-b  border-brand-red  py-2 px-4 mb-2">
                  What is the mint price?
                </summary>

                <span className="px-4 py-4 text-brand-red">
                  WL - 0.01 ETH, Public - TBA
                </span>
              </details>
              <details className="mb-4">
                <summary className="font-semibold  border-b  border-brand-red   py-2 px-4 mb-2">
                  When is the mint date?
                </summary>

                <span className="px-4 py-4 text-brand-red">
                  November, TBA
                </span>
              </details>
              <details className="mb-4">
                <summary className="font-semibold  border-b  border-brand-red py-2 px-4 mb-2">
                How to get WL?
                </summary>

                <span className="px-4 py-4 text-brand-red">
                Through raffles from collaboration or Twitter giveaways. 
                </span>
              </details>
              <details className="mb-4">
                <summary className="font-semibold  border-b  border-brand-red  py-2 px-4 mb-2">
                  What was your main goal?
                </summary>

                <span className="px-4 py-4 text-brand-red block">
                Our goal was to create art of such quality that people want to hang it on their walls instead of moving it to the "hidden" folder.
                </span>
              </details>
              <details className="mb-4">
                <summary className="font-semibold  border-b  border-brand-red py-2 px-4 mb-2">
                How are you different from other similar projects?
                </summary>

                <span className="px-4 py-2 text-brand-red block" >
                1. The quality of our creations is much better. 8000x8000px 300DPI. No other NFT collection seems to have this.   </span>    
                <span className="px-4 py-2 text-brand-red block" >
                2. Our collection is diverse unlike other similar ones. This means that our supply consists of many "characters" and styles.
                </span>
              </details>
              
              <details className="mb-4">
                <summary className="font-semibold  border-b  border-brand-red py-2 px-4 mb-2">
                When is the reveal?
                </summary>

                <span className="px-4 py-4 text-brand-red">
                A few days after minting day.
                </span>
              </details>
              </div>

          </div>
        </div>
      </section>
    </div>
    <div id="faq">
      <section className="text-brand-red">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="sm:text-xl  text-center title-font Montserrat-Light-Alt1 text-brand-red">
            © 2022 NeuralMix Art
            </h1> 
          </div>
        </div> 
      </section>
    </div> 
    </div>
  )
}
