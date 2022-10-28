/**
 *  This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 */

require('@nomiclabs/hardhat-etherscan')

 const hre = require('hardhat')
 const { MerkleTree } = require('merkletreejs')
 const keccak256 = require('keccak256')
 const whitelist = require('./whitelist.js')
 
 const BASE_URI = 'ipfs://Qmb5A1fFECM2iFHgUioii2khT814nCi6VU9aHXHHqNxHCK/'
 const proxyRegistryAddressGoerli = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
 const proxyRegistryAddressGoerli = '0x8498c44ca0ac643073Bb548d1faEd511FE823098'

 const proxyRegistryAddressMainnet = '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
 
 async function main() {
   // Calculate merkle root from the whitelist array
   const leafNodes = whitelist.map((addr) => keccak256(addr))
   const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
   const root = merkleTree.getRoot()
 
   await hre.run('verify:verify', {
     address: '0x1E34b2e70A1652EBc9f2284547596c234041e892', // Deployed contract address
     constructorArguments: [BASE_URI, root, proxyRegistryAddressGoerli]
   })
 }
 
 // We recommend this pattern to be able to use async/await everywhere
 // and properly handle errors.
 main()
   .then(() => process.exit(0))
   .catch((error) => {
     console.error(error)
     process.exit(1)
   })
 