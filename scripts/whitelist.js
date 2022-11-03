/**
 *  This array contains the addresses of the whitelisted users.
 *  Make sure to add your white-listed users to this array. Otherwise,
 *  they will not be able to interact with the contract and mint on pre-sale process. For the public sale,
 *  the whitelist is not required.
 *
 *  ** IMPORTANT: **
 *  Since we are passing the whitelist root (merkleroot) to the contract constructor when deploying,
 *  if you add a new user address to the whitelist or remove an existing user address from the whitelist,
 *  you must change the merkleroot in the contract. For this reason, I created a new script to update the merkleroot
 *  in the contract. You can find it in `scripts/setMerkleRoot.js`.
 */
{/* <Link href="/mintnma" passHref>
                <a className="mt-6 Montserrat-Light-Alt1 uppercase inline-flex items-center px-16 oy-2 text-sm sm:text-2xl md:text-3xl  text-center rounded bg-brand-red text-brand-background transform hover:scale-105">
                  Go to minting page
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 ml-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </Link> */}
 module.exports = [
  '0x67Ac2A27a7444a53A4db1317c0631822Da02b4f8',
  '0x8498c44ca0ac643073Bb548d1faEd511FE823098',
  '0x9cEC3E680302eb2f6784d6a3A9dfd2FA25486752',
  '0x67Ac2A27a7444a53A4db1317c0631822Da02b4f8',
  '0xa3dC300b3C1d47ba79f88DD48a59Ad614735370F',
  '0xa168220a9b9Cec4cDeE4EFb8DEE44d1aedcB666c',
  '0xc072d44EeAAf879335C88D836f6a5560bC11136A'
]
