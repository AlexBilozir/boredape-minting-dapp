// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import '@openzeppelin/contracts/finance/PaymentSplitter.sol';
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// @author codingwithdidem
// @contact codingwithdidem@gmail.com

contract NeuralMixArt is 
    ERC721, 
    Ownable, 
    ReentrancyGuard, 
    PaymentSplitter 
{
    using Strings for uint256;
    using Counters for Counters.Counter;

    bytes32 public root;
    
    address proxyRegistryAddress;

    uint256 public maxSupply = 5000;

    string public baseURI; 
    string public notRevealedUri = "ipfs://QmYUuwLoiRb8woXwJCCsr1gvbr8E21KuxRtmVBmnH1tZz7/hidden.json";
    string public baseExtension = ".json";

    bool public paused = true;
    bool public revealed = false;
    bool public presaleM = false;
    bool public publicM = false;

    uint256 presaleAmountLimit = 1;
    mapping(address => uint256) public _presaleClaimed;

    uint256 _price = 69000000000000000; // 0.069 ETH
    uint256 _presalePrice = 42000000000000000; // 0.042 ETH

    Counters.Counter private _tokenIds;

    uint256[] private _teamShares = [25, 35, 40]; // 3 PEOPLE IN THE TEAM
    address[] private _team = [
        0x8498c44ca0ac643073Bb548d1faEd511FE823098, 
        0x9cEC3E680302eb2f6784d6a3A9dfd2FA25486752, 
        0x67Ac2A27a7444a53A4db1317c0631822Da02b4f8 
    ];

    constructor(string memory uri, bytes32 merkleroot, address _proxyRegistryAddress)
        ERC721("NeuralMixArt", "NMA")
        PaymentSplitter(_team, _teamShares) // Split the payment based on the teamshares percentages
        ReentrancyGuard() // A modifier that can prevent reentrancy during certain functions
    {
        root = merkleroot;
        proxyRegistryAddress = _proxyRegistryAddress;

        setBaseURI(uri);
    }

    function setBaseURI(string memory _tokenBaseURI) public onlyOwner {
        baseURI = _tokenBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function reveal() public onlyOwner {
        revealed = true;
    }

    function setMerkleRoot(bytes32 merkleroot) 
    onlyOwner 
    public 
    {
        root = merkleroot;
    }

    modifier onlyAccounts () {
        require(msg.sender == tx.origin, "Not allowed origin");
        _;
    }

    modifier isValidMerkleProof(bytes32[] calldata _proof) {
         require(MerkleProof.verify(
            _proof,
            root,
            keccak256(abi.encodePacked(msg.sender))
            ) == true, "Not allowed origin");
        _;
   }

    function togglePause() public onlyOwner {
        paused = !paused;
    }

    function togglePresale() public onlyOwner {
        presaleM = !presaleM;
    }

    function togglePublicSale() public onlyOwner {
        publicM = !publicM;
    }


    function presaleMint(address account, uint256 _amount, bytes32[] calldata _proof)
    external
    payable
    isValidMerkleProof(_proof)
    onlyAccounts
    {
        require(msg.sender == account,          "NeuralMixArt: Not allowed");
        require(presaleM,                       "NeuralMixArt: Presale is OFF");
        require(!paused,                        "NeuralMixArt: Contract is paused");
        require(
            _amount <= presaleAmountLimit,      "NeuralMixArt: You can't mint so much tokens");
        require(
            _presaleClaimed[msg.sender] + _amount <= presaleAmountLimit,  "NeuralMixArt: You can't mint so much tokens");


        uint current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "NeuralMixArt: max supply exceeded"
        );
        require(
            _presalePrice * _amount <= msg.value,
            "NeuralMixArt: Not enough ethers sent"
        );
             
        _presaleClaimed[msg.sender] += _amount;

        for (uint i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function publicSaleMint(uint256 _amount) 
    external 
    payable
    onlyAccounts
    {
        require(publicM, "NeuralMixArt: PublicSale is OFF");
        require(!paused, "NeuralMixArt: Contract is paused");
        require(_amount > 0, "NeuralMixArt: zero amount");

        uint current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "NeuralMixArt: Max supply exceeded"
        );
        require(
            _price * _amount <= msg.value,
            "NeuralMixArt: Not enough ethers sent"
        );
        
        
        for (uint i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function mintInternal() internal nonReentrant {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
    
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function totalSupply() public view returns (uint) {
        return _tokenIds.current();
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        override
        public
        view
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }
}



/**
  @title An OpenSea delegate proxy contract which we include for whitelisting.
  @author OpenSea
*/
contract OwnableDelegateProxy {}

/**
  @title An OpenSea proxy registry contract which we include for whitelisting.
  @author OpenSea
*/
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}



