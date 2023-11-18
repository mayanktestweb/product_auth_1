const ADDRESS = "0x58F196F09144320e6621002294c640d9a237F670";
const ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "createdAt",
                type: "uint256",
            },
        ],
        name: "ProductCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "updatedAt",
                type: "uint256",
            },
        ],
        name: "ProductUsed",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "string",
                name: "key",
                type: "string",
            },
        ],
        name: "createProduct",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newOwner",
                type: "address",
            },
        ],
        name: "setNewOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "useProduct",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "collection",
        outputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "bool",
                name: "used",
                type: "bool",
            },
            {
                internalType: "string",
                name: "key",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "createdAt",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "updatedAt",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "productExists",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

module.exports = { ADDRESS, ABI };
