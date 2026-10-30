// Auto-generated from contracts/PayProofEscrow.sol
export const PAYPROOF_ESCROW_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "payout",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "AutoReleasedOnSilence",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "fileHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "deliverableUri",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "reviewDeadline",
        "type": "uint256"
      }
    ],
    "name": "DeliverableSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "initiator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "evidence",
        "type": "string"
      }
    ],
    "name": "DisputeRaised",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum PayProofEscrow.State",
        "name": "finalState",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "votesForFreelancer",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "votesForClient",
        "type": "uint8"
      }
    ],
    "name": "DisputeResolved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "referee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "favorFreelancer",
        "type": "bool"
      }
    ],
    "name": "DisputeVoted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      }
    ],
    "name": "JobAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "client",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      }
    ],
    "name": "JobFunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      }
    ],
    "name": "ProofBadgeMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "RefundClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "reason",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "revisionsUsed",
        "type": "uint8"
      }
    ],
    "name": "RevisionRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "payout",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "rating",
        "type": "uint8"
      }
    ],
    "name": "WorkApprovedAndPaid",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      }
    ],
    "name": "acceptJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_referee",
        "type": "address"
      }
    ],
    "name": "addReferee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_rating",
        "type": "uint8"
      }
    ],
    "name": "approveWork",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      }
    ],
    "name": "autoRelease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "badgeCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_favorFreelancer",
        "type": "bool"
      }
    ],
    "name": "castRefereeVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      }
    ],
    "name": "claimRefund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_freelancer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_reviewWindow",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_maxRevisions",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      }
    ],
    "name": "createAndFundJob",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      }
    ],
    "name": "getJob",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "client",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "freelancer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reviewWindow",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reviewDeadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "acceptedAt",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "maxRevisions",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "revisionsUsed",
            "type": "uint8"
          },
          {
            "internalType": "enum PayProofEscrow.State",
            "name": "state",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "fileHash",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "deliverableUri",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "rating",
            "type": "uint8"
          }
        ],
        "internalType": "struct PayProofEscrow.Job",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVaultSummary",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalLocked",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "activeJobCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalReleasedSum",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isReferee",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "jobCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "jobs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "client",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reviewWindow",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reviewDeadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "acceptedAt",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "maxRevisions",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "revisionsUsed",
        "type": "uint8"
      },
      {
        "internalType": "enum PayProofEscrow.State",
        "name": "state",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "fileHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "deliverableUri",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "rating",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_evidence",
        "type": "string"
      }
    ],
    "name": "raiseDispute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_referee",
        "type": "address"
      }
    ],
    "name": "removeReferee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_reason",
        "type": "string"
      }
    ],
    "name": "requestRevision",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_paused",
        "type": "bool"
      }
    ],
    "name": "setPaused",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_jobId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_fileHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    "name": "submitDeliverable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalReleased",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalVaultLocked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "votesForClient",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "votesForFreelancer",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const;

export const PAYPROOF_ESCROW_BYTECODE = "0x6080806040523461004657600160048190555f80546001600160a01b0319163390811782558152600960205260409020805460ff191690911790556122f9908161004b8239f35b5f80fdfe6080604052600436101561005d575b3615610018575f80fd5b60405162461bcd60e51b815260206004820152601760248201527f4449524543545f4445504f5349545f52454a45435445440000000000000000006044820152606490fd5b5f3560e01c806316c38b3c14611d1b578063180aedf314611c0857806337f9d9ad14611bdb5780633cafeb9914611ba35780634385963214611b55578063459b860e146119ea57806346ffbd65146117bb57806350355d761461179e578063562918e5146117815780635aef573c146116435780635b7baf64146114bd5780635c975abb1461149957806363b2f3c9146113fb5780637921f48214610e285780637be82d5314610dde5780638cb359b414610c055780638da5cb5b14610bde578063a008d89314610ba1578063a36697d314610a70578063a7039843146109e6578063bf22c45714610795578063c55e4a0e146106af578063d6786752146101c2578063e33b7de3146101a55763f12ccc200361000e57346101a15760203660031901126101a1576004355f526007602052602060ff60405f205416604051908152f35b5f80fd5b346101a1575f3660031901126101a1576020600354604051908152f35b346101a15760403660031901126101a157602435801515908181036101a1576101ef600160045414611f7e565b5f600455335f52600960205260ff60405f205416801561069c575b15610668576004355f52600560205260405f2091600883019160ff835460101c16600781101561065457600403610620576004355f52600660205260405f20335f5260205260ff60405f2054166105eb576004355f52600660205260405f20335f5260205260405f209060ff19916001838254161790555f146105c1576004355f52600760205260405f209081549060ff6102a68184166122b2565b1691161790555b60405190815233907f910296c2d7f214e2d62a9c4e6e403cc9c5ac4585d96830dbf018e51c75fd0826602060043592a36004355f5260076020526002908160ff60405f20541610155f146104bd576205000062ff00001982541617905560038201549061031b828254612157565b81556103298260035461203a565b600355828101546001600160a01b03165f908152600a60205260409020805461035190611fbd565b90556019820292828404601914831517156104a9575f80939281939261037d83946103e8890490612157565b916004358452600760205260ff604085205416600860205260ff6040862054166040519160058352602083015260408201527f9551a0440f822e4270fab9be7b89747085a298e505c0de1fee9f3b4989b1ee54606060043592a260018060a01b03908201541680917fd9a1b3ff57b0c0fea5b1c5284b96b9b12babbc9948aec08a6a3140d6bf82d9c86040518061041a600b600435950182612164565b0390a35af16104276121fc565b501561046c576103e88104610440575b505b6001600455005b5f8080806103e8610466950460018060a01b038254165af16104606121fc565b50612270565b80610437565b60405162461bcd60e51b8152602060048201526015602482015274111254d415551157d4105653d55517d19052531151605a1b6044820152606490fd5b634e487b7160e01b5f52601160045260245ffd5b9160086020528160ff60405f20541610156104db575b505050610439565b5f80939281939282936206000062ff000019825416179055600381015491610504838254612157565b90556004358352600760205260ff604084205416600860205260ff6040852054166040519160068352602083015260408201527f9551a0440f822e4270fab9be7b89747085a298e505c0de1fee9f3b4989b1ee54606060043592a2600101546001600160a01b03165af16105766121fc565b5015610584578080806104d3565b60405162461bcd60e51b8152602060048201526015602482015274111254d415551157d4915195539117d19052531151605a1b6044820152606490fd5b6004355f52600860205260405f209081549060ff6105e08184166122b2565b1691161790556102ad565b60405162461bcd60e51b815260206004820152600d60248201526c1053149150511657d593d51151609a1b6044820152606490fd5b60405162461bcd60e51b815260206004820152600c60248201526b1393d517d11254d41555115160a21b6044820152606490fd5b634e487b7160e01b5f52602160045260245ffd5b60405162461bcd60e51b815260206004820152600c60248201526b4f4e4c595f5245464552454560a01b6044820152606490fd5b505f546001600160a01b0316331461020a565b346101a1575f3660031901126101a157600180545f90825b818111156106ec57606083600254906003549060405192835260208301526040820152f35b805f52600560205260ff600860405f20015460101c1660078110159081610654578015918215610789575b8215610778575b8215610767575b8215610756575b5050610741575b61073c90611fbd565b6106c7565b9161074e61073c91611fbd565b929050610733565b90915061065457600414858061072c565b809250610654576003811491610725565b80925061065457600281149161071e565b5085811491505f610717565b346101a15760203660031901126101a1575f6101c06040516107b681611da2565b8281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e082015282610100820152826101208201528261014082015282610160820152606061018082015260606101a082015201526004355f52600560205260405f206040519061082c82611da2565b8054825260018101546001600160a01b03908116602084015260028201541660408301526003810154606083015260048101546080830152600581015460a0830152600681015460c083015260078082015460e084015260088083015460ff8082166101008701529181901c821661012086015291601083901c90911610156106545760ff9182600c9260101c1661014085015260098101546101608501526108d7600a8201611de1565b6101808501526108e9600b8201611de1565b6101a08501520154166101c08201526040518091602082528051602083015260018060a01b03602082015116604083015260018060a01b03604082015116606083015260608101516080830152608081015160a083015260a081015160c083015260c081015160e083015260e081015161010083015260ff6101008201511661012083015260ff61012082015116610140830152610991610140820151610160840190611e82565b61016081015161018083015261018081015160ff6101c06109da6109c46101e094856101a0890152610200880190611e8f565b6101a0860151878203601f190184890152611e8f565b93015116908301520390f35b346101a15760203660031901126101a1576109ff611ecd565b5f546001600160a01b039190610a189083163314611f45565b168015610a39575f908152600960205260409020805460ff19166001179055005b60405162461bcd60e51b815260206004820152600f60248201526e494e56414c49445f5245464552454560881b6044820152606490fd5b346101a157610a7e36611f11565b90825f526005602052610aa160018060a01b03600160405f2001541633146120e1565b825f526005602052600860405f20019182549260ff8460101c166007811015610654576002610ad0911461211b565b60ff808560081c169416841015610b5c57610b24610b0e7f1bf54d6debdcaa6ad43a314fb3068a555e156176e521eade8c0f6c6ad139aa4f956122b2565b825461ff00191660089190911b61ff0016178255565b6203000062ff0000198254161780915560ff610b4d604051948594604086526040860191612047565b9160081c1660208301520390a2005b60405162461bcd60e51b815260206004820152601760248201527f5245564953494f4e5f4c494d49545f45584345454445440000000000000000006044820152606490fd5b346101a15760203660031901126101a1576001600160a01b03610bc2611ecd565b165f526009602052602060ff60405f2054166040519015158152f35b346101a1575f3660031901126101a1575f546040516001600160a01b039091168152602090f35b346101a15760403660031901126101a15760243560ff81166004358183036101a157610c35600160045414611f7e565b5f600455805f52600560205260018060a01b0392610c5d84600160405f2001541633146120e1565b815f52600560205260405f209260088401805460ff8160101c1690600782101561065457610c91600262050000931461211b565b62ff0000191617905515610dd557905b60ff600c8401921660ff19835416178255600383015492610cc484600254612157565b600255610cd38460035461203a565b60035560028101858154165f52600a60205260405f20610cf38154611fbd565b90556019850290858204601914861517156104a957836103e88893049687610d1a91612157565b955460ff1660405190878252886020830152604082015260607fe69a7de87fe69717746f8dbb303d3386c23fdb3eb1804a0115d5b7b82fa0351391a25416918291604051600b819201610d6d9082612164565b037fd9a1b3ff57b0c0fea5b1c5284b96b9b12babbc9948aec08a6a3140d6bf82d9c891a35a5f809381938293f1610da26121fc565b50610dac9061222b565b80610db8576001600455005b5f80808093610dce958254165af16104606121fc565b8080610439565b50600590610ca1565b346101a15760203660031901126101a157610df7611ecd565b5f546001600160a01b039190610e109083163314611f45565b165f908152600960205260409020805460ff19169055005b60a03660031901126101a157610e3c611ecd565b60ff60643516606435036101a15760843567ffffffffffffffff81116101a157610e6a903690600401611ee3565b90610e79600160045414611f7e565b5f60045560ff5f5460a01c166113c4573415611391576001600160a01b03831615611355576001600160a01b038316331461131d57610eb9600154611fbd565b6001819055916044358015611313575b60643560ff161561130a5760ff6064355b60405192610ee784611da2565b86845233602085015260018060a01b0388166040850152346060850152602435608085015260a08401525f60c08401525f60e0840152166101008201525f6101208201525f6101408201525f61016082015260405180602081011067ffffffffffffffff60208301111761127d57602081016040525f8152610180820152610f6e82611fcb565b610f7b6040519182611dbf565b82815236838501116101a157828460208301375f602084830101526101a08201525f6101c0820152835f52600560205260405f2094815186556001860160018060a01b03602084015116906bffffffffffffffffffffffff60a01b9182825416179055600287019060018060a01b0360408501511690825416179055606082015160038701556080820151600487015560a0820151600587015560c0820151600687015560e082015160078701556008860160ff6101008401511660ff1982541617815561106260ff61012085015116829061ff0082549160081b169061ff001916179055565b61014083015160078110156106545762ff000082549160101b169062ff00001916179055610160820151600987015561018082015180519067ffffffffffffffff821161127d5781906110c5826110bc600a8c0154611d6a565b600a8c01611fe7565b602090601f831160011461129c575f92611291575b50508160011b915f199060031b1c191617600a8701555b6101a08201519182519667ffffffffffffffff881161127d5787879461112960209a611120600b860154611d6a565b600b8601611fe7565b8990601f83116001146111e257600c7ff9276ca8f5575af7ba43a3b3ed5592fd5c8b9d089fb651d170ddec784add51f89694846111c7979560ff956101c0955f926111d7575b50508160011b915f199060031b1c191617600b8201555b019201511660ff198254161790556111a03460025461203a565b60025560405191829134835260408a84015260018060a01b03169633966040840191612047565b0390a46001600455604051908152f35b015190508f8061116f565b90600b84015f528a5f20915f5b601f198516811061126357507ff9276ca8f5575af7ba43a3b3ed5592fd5c8b9d089fb651d170ddec784add51f8969460018560ff956101c095600c956111c79b99601f1981161061124b575b505050811b01600b820155611186565b01515f1960f88460031b161c191690558f808061123b565b8183015184558b9850600190930192918c01918c016111ef565b634e487b7160e01b5f52604160045260245ffd5b0151905088806110da565b9250600a89015f5260205f20905f935b601f19841685106112ef576001945083601f198116106112d7575b505050811b01600a8701556110f1565b01515f1960f88460031b161c191690558880806112c7565b818101518355602094850194600190930192909101906112ac565b60ff6002610eda565b5062069780610ec9565b60405162461bcd60e51b815260206004820152601060248201526f21a0a72727aa2fa424a922afa9a2a62360811b6044820152606490fd5b60405162461bcd60e51b81526020600482015260146024820152732d22a927afa32922a2a620a721a2a92fa0a2222960611b6044820152606490fd5b60405162461bcd60e51b815260206004820152600b60248201526a16915493d7d05353d5539560aa1b6044820152606490fd5b60405162461bcd60e51b815260206004820152600f60248201526e10d3d395149050d517d4105554d151608a1b6044820152606490fd5b346101a15760203660031901126101a157600435805f52600560205261143160018060a01b03600260405f200154163314612067565b805f52600560205260405f2060088101805460ff8160101c16906007821015610654576114626201000092156120a5565b62ff0000191617905560074291015533907f4426e4a90a9570c8f678a263b11785eaaade8b79d76d18c43d4d8e00062e4f835f80a3005b346101a1575f3660031901126101a157602060ff5f5460a01c166040519015158152f35b346101a1576020806003193601126101a1576004356114e0600160045414611f7e565b5f600455805f526005825260018060a01b0361150681600160405f2001541633146120e1565b815f526005835260405f2060088101805460ff8160101c166007811015610654571580611616575b156115e15785945f9460018695869562060000879662ff0000191617905560038101549361155e85600254612157565b6002557f1b616a611b7eb8d21c571e4fa4356427d3466d01790c90aeaa9e2d20ff8ac9228a604051878152a20154165af16115976121fc565b50156115a4576001600455005b6064906040519062461bcd60e51b82526004820152601660248201527514915195539117d514905394d1915497d1905253115160521b6044820152fd5b60405162461bcd60e51b815260048101879052600d60248201526c10d0539393d517d49151955391609a1b6044820152606490fd5b5060048301548015908115611638575b508061152e575060078301541561152e565b905042101587611626565b346101a15761165136611f11565b9190815f52600560205260405f2060018060a01b03806001830154163314908115611771575b501561173c576008019081549060ff8260101c1660078110156106545760028114908115611731575b50156116f4577f1b84372106d77c6daea0dda35bbc0229d10a83f58ec89909288492519368234192620400006116ef9362ff000019161790556040519182916020835233966020840191612047565b0390a3005b60405162461bcd60e51b8152602060048201526015602482015274494e56414c49445f444953505554455f535441544560581b6044820152606490fd5b6001915014866116a0565b60405162461bcd60e51b815260206004820152600d60248201526c4e4f545f4a4f425f504152545960981b6044820152606490fd5b9050600282015416331485611677565b346101a1575f3660031901126101a1576020600254604051908152f35b346101a1575f3660031901126101a1576020600154604051908152f35b346101a15760603660031901126101a15760243560043567ffffffffffffffff6044358181116101a1576117f3903690600401611ee3565b835f959295526020926005845261181a60018060a01b03600260405f200154163314612067565b845f526005845260405f20906008820180549060ff8260101c16916007831015610654576118556001938481149081156119df575b506120a5565b86156119a85762ff000019166202000017905560098301859055600a830191841161127d5761188e846118888454611d6a565b84611fe7565b5f601f851160011461192057927f59ef6cbcf2d42fc40ae7fd63b0145b718d58d41a4bc1706adb56b63ba36c40b897989285806006979461190a975f93611915575b501b905f198560031b1c19161790555b6118ee60058201544261203a565b9485910155606060405196879687528601526060850191612047565b9060408301520390a2005b87013592508d6118d0565b601f19851690835f52875f20915f5b81811061199357509261190a95927f59ef6cbcf2d42fc40ae7fd63b0145b718d58d41a4bc1706adb56b63ba36c40b89a9b959288600699961061197a575b505083811b0190556118e0565b8601355f19600387901b60f8161c191690558b8061196d565b8b83013584559284019291890191890161192f565b60405162461bcd60e51b815260048101899052600f60248201526e08a9aa0a8b2be8c92988abe9082a69608b1b6044820152606490fd5b60039150148c61184f565b346101a15760203660031901126101a157600435611a0c600160045414611f7e565b5f600455805f52600560205260405f209060088201805460ff8160101c166007811015610654576002611a3f911461211b565b60068401544210611b2057620500009062ff00001916179055600c8201600560ff19825416179055600382015490611a7982600254612157565b600255611a888260035461203a565b600355600283019060018060a01b0393848354165f52600a60205260405f20611ab18154611fbd565b905560198402848104601914851517156104a9576103e88691049485611ad691612157565b938360405186815287602082015260407ffd4abfb256a841280d559a539ee89cde8642fdf4ac8eeca1306a3c4b922528c791a25416918291604051600b819201610d6d9082612164565b60405162461bcd60e51b815260206004820152600d60248201526c57494e444f575f41435449564560981b6044820152606490fd5b346101a15760403660031901126101a1576024356001600160a01b038116908190036101a1576004355f52600660205260405f20905f52602052602060ff60405f2054166040519015158152f35b346101a15760203660031901126101a1576001600160a01b03611bc4611ecd565b165f52600a602052602060405f2054604051908152f35b346101a15760203660031901126101a1576004355f526008602052602060ff60405f205416604051908152f35b346101a15760203660031901126101a1576004355f52600560205260405f208054600160a01b60019003918260018201541692600282015416906003810154600482015460058301546006840154600785015490600886015492600987015494600a8801611c7590611de1565b96611c82600b8a01611de1565b98600c015460ff16996040519c8d9c8d5260208d015260408c015260608b015260808a015260a089015260c088015260e087015260ff81166101008701528060081c60ff1661012087015261014086019060101c60ff1690611ce391611e82565b6101608501526101e0806101808601528401611cfe91611e8f565b8381036101a0850152611d1091611e8f565b906101c08301520390f35b346101a15760203660031901126101a1576004358015158091036101a1575f5490611d50336001600160a01b03841614611f45565b60ff60a01b1990911660a09190911b60ff60a01b16175f55005b90600182811c92168015611d98575b6020831014611d8457565b634e487b7160e01b5f52602260045260245ffd5b91607f1691611d79565b6101e0810190811067ffffffffffffffff82111761127d57604052565b90601f8019910116810190811067ffffffffffffffff82111761127d57604052565b9060405191825f825492611df484611d6a565b9081845260019485811690815f14611e5f5750600114611e1f575b5050611e1d92500383611dbf565b565b909391505f52602090815f20935f915b818310611e47575050611e1d93508201015f80611e0f565b85548884018501529485019487945091830191611e2f565b915050611e1d94506020925060ff191682840152151560051b8201015f80611e0f565b9060078210156106545752565b91908251928382525f5b848110611eb9575050825f602080949584010152601f8019910116010190565b602081830181015184830182015201611e99565b600435906001600160a01b03821682036101a157565b9181601f840112156101a15782359167ffffffffffffffff83116101a157602083818601950101116101a157565b9060406003198301126101a157600435916024359067ffffffffffffffff82116101a157611f4191600401611ee3565b9091565b15611f4c57565b60405162461bcd60e51b815260206004820152600a60248201526927a7262cafa7aba722a960b11b6044820152606490fd5b15611f8557565b60405162461bcd60e51b815260206004820152601060248201526f149151539514905390d657d1d550549160821b6044820152606490fd5b5f1981146104a95760010190565b67ffffffffffffffff811161127d57601f01601f191660200190565b90601f8111611ff557505050565b5f91825260208220906020601f850160051c83019410612030575b601f0160051c01915b82811061202557505050565b818155600101612019565b9092508290612010565b919082018092116104a957565b908060209392818452848401375f828201840152601f01601f1916010190565b1561206e57565b60405162461bcd60e51b815260206004820152600f60248201526e27a7262cafa32922a2a620a721a2a960891b6044820152606490fd5b156120ac57565b60405162461bcd60e51b815260206004820152600d60248201526c494e56414c49445f535441544560981b6044820152606490fd5b156120e857565b60405162461bcd60e51b815260206004820152600b60248201526a13d3931657d0d31251539560aa1b6044820152606490fd5b1561212257565b60405162461bcd60e51b815260206004820152600d60248201526c1393d517d4d550935255151151609a1b6044820152606490fd5b919082039182116104a957565b906020918281525f92825461217881611d6a565b93848385015260019182811690815f146121d7575060011461219d575b505050505090565b5f908152828120949550935b8585106121c3575050506040925001015f80808080612195565b8054858501604001529382019381016121a9565b93505050506040935060ff929192191683830152151560051b01015f80808080612195565b3d15612226573d9061220d82611fcb565b9161221b6040519384611dbf565b82523d5f602084013e565b606090565b1561223257565b60405162461bcd60e51b815260206004820152601660248201527514105653d55517d514905394d1915497d1905253115160521b6044820152606490fd5b1561227757565b60405162461bcd60e51b815260206004820152601360248201527211915157d514905394d1915497d19052531151606a1b6044820152606490fd5b60ff1660ff81146104a9576001019056fea2646970667358221220931e7c6ed8643959589f54a1abcd719e4197837e55f9c83b923884bef0724a2264736f6c63430008140033";

export const PAYPROOF_ESCROW_SOURCE = "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\n/**\n * @title PayProofEscrow\n * @dev Ultra-secure, trust-first escrow smart contract for PayProof on MST Blockchain.\n * Built for student micro-gigs with automated milestone protection, 5-day review timer,\n * 2.5% platform fee calculation, 2-of-3 referee arbitration, and Proof-of-Work badges.\n */\ncontract PayProofEscrow {\n    enum State {\n        Funded,\n        InProgress,\n        Submitted,\n        RevisionRequested,\n        Disputed,\n        Released,\n        Refunded\n    }\n\n    struct Job {\n        uint256 id;\n        address client;\n        address freelancer;\n        uint256 amount;\n        uint256 deadline;\n        uint256 reviewWindow;\n        uint256 reviewDeadline;\n        uint256 acceptedAt;\n        uint8 maxRevisions;\n        uint8 revisionsUsed;\n        State state;\n        bytes32 fileHash;\n        string deliverableUri;\n        string title;\n        uint8 rating;\n    }\n\n    address public owner;\n    bool public paused;\n    uint256 public jobCounter;\n    uint256 public totalVaultLocked;\n    uint256 public totalReleased;\n\n    uint256 private _unlocked = 1;\n\n    mapping(uint256 => Job) public jobs;\n    mapping(uint256 => mapping(address => bool)) public hasVoted;\n    mapping(uint256 => uint8) public votesForFreelancer;\n    mapping(uint256 => uint8) public votesForClient;\n    mapping(address => bool) public isReferee;\n    mapping(address => uint256) public badgeCount;\n\n    event JobFunded(\n        uint256 indexed jobId,\n        address indexed client,\n        address indexed freelancer,\n        uint256 amount,\n        string title\n    );\n    event JobAccepted(uint256 indexed jobId, address indexed freelancer);\n    event DeliverableSubmitted(\n        uint256 indexed jobId,\n        bytes32 fileHash,\n        string deliverableUri,\n        uint256 reviewDeadline\n    );\n    event WorkApprovedAndPaid(\n        uint256 indexed jobId,\n        uint256 payout,\n        uint256 fee,\n        uint8 rating\n    );\n    event RevisionRequested(uint256 indexed jobId, string reason, uint8 revisionsUsed);\n    event AutoReleasedOnSilence(uint256 indexed jobId, uint256 payout, uint256 fee);\n    event RefundClaimed(uint256 indexed jobId, uint256 amount);\n    event DisputeRaised(uint256 indexed jobId, address indexed initiator, string evidence);\n    event DisputeVoted(uint256 indexed jobId, address indexed referee, bool favorFreelancer);\n    event DisputeResolved(\n        uint256 indexed jobId,\n        State finalState,\n        uint8 votesForFreelancer,\n        uint8 votesForClient\n    );\n    event ProofBadgeMinted(\n        uint256 indexed jobId,\n        address indexed freelancer,\n        string title\n    );\n\n    modifier nonReentrant() {\n        require(_unlocked == 1, \"REENTRANCY_GUARD\");\n        _unlocked = 0;\n        _;\n        _unlocked = 1;\n    }\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, \"ONLY_OWNER\");\n        _;\n    }\n\n    modifier whenNotPaused() {\n        require(!paused, \"CONTRACT_PAUSED\");\n        _;\n    }\n\n    modifier onlyClient(uint256 _jobId) {\n        require(jobs[_jobId].client == msg.sender, \"ONLY_CLIENT\");\n        _;\n    }\n\n    modifier onlyFreelancer(uint256 _jobId) {\n        require(jobs[_jobId].freelancer == msg.sender, \"ONLY_FREELANCER\");\n        _;\n    }\n\n    modifier onlyReferee() {\n        require(isReferee[msg.sender] || msg.sender == owner, \"ONLY_REFEREE\");\n        _;\n    }\n\n    constructor() {\n        owner = msg.sender;\n        isReferee[msg.sender] = true;\n    }\n\n    function setPaused(bool _paused) external onlyOwner {\n        paused = _paused;\n    }\n\n    function addReferee(address _referee) external onlyOwner {\n        require(_referee != address(0), \"INVALID_REFEREE\");\n        isReferee[_referee] = true;\n    }\n\n    function removeReferee(address _referee) external onlyOwner {\n        isReferee[_referee] = false;\n    }\n\n    /**\n     * @notice Step 1: Client locks money into escrow for student freelancer\n     */\n    function createAndFundJob(\n        address _freelancer,\n        uint256 _deadline,\n        uint256 _reviewWindow,\n        uint8 _maxRevisions,\n        string calldata _title\n    ) external payable nonReentrant whenNotPaused returns (uint256) {\n        require(msg.value > 0, \"ZERO_AMOUNT\");\n        require(_freelancer != address(0), \"ZERO_FREELANCER_ADDR\");\n        require(_freelancer != msg.sender, \"CANNOT_HIRE_SELF\");\n\n        jobCounter++;\n        uint256 currentId = jobCounter;\n\n        jobs[currentId] = Job({\n            id: currentId,\n            client: msg.sender,\n            freelancer: _freelancer,\n            amount: msg.value,\n            deadline: _deadline,\n            reviewWindow: _reviewWindow > 0 ? _reviewWindow : 5 days,\n            reviewDeadline: 0,\n            acceptedAt: 0,\n            maxRevisions: _maxRevisions > 0 ? _maxRevisions : 2,\n            revisionsUsed: 0,\n            state: State.Funded,\n            fileHash: bytes32(0),\n            deliverableUri: \"\",\n            title: _title,\n            rating: 0\n        });\n\n        totalVaultLocked += msg.value;\n\n        emit JobFunded(currentId, msg.sender, _freelancer, msg.value, _title);\n        return currentId;\n    }\n\n    /**\n     * @notice Step 2: Freelancer accepts the funded job\n     */\n    function acceptJob(uint256 _jobId) external onlyFreelancer(_jobId) {\n        Job storage job = jobs[_jobId];\n        require(job.state == State.Funded, \"INVALID_STATE\");\n\n        job.state = State.InProgress;\n        job.acceptedAt = block.timestamp;\n\n        emit JobAccepted(_jobId, msg.sender);\n    }\n\n    /**\n     * @notice Step 3: Freelancer submits work proof (SHA-256 hash + deliverable URI)\n     */\n    function submitDeliverable(\n        uint256 _jobId,\n        bytes32 _fileHash,\n        string calldata _uri\n    ) external onlyFreelancer(_jobId) {\n        Job storage job = jobs[_jobId];\n        require(\n            job.state == State.InProgress || job.state == State.RevisionRequested,\n            \"INVALID_STATE\"\n        );\n        require(_fileHash != bytes32(0), \"EMPTY_FILE_HASH\");\n\n        job.state = State.Submitted;\n        job.fileHash = _fileHash;\n        job.deliverableUri = _uri;\n        job.reviewDeadline = block.timestamp + job.reviewWindow;\n\n        emit DeliverableSubmitted(_jobId, _fileHash, _uri, job.reviewDeadline);\n    }\n\n    /**\n     * @notice Step 4A: Client approves deliverable -> 97.5% paid to freelancer, 2.5% fee to owner\n     */\n    function approveWork(uint256 _jobId, uint8 _rating)\n        external\n        nonReentrant\n        onlyClient(_jobId)\n    {\n        Job storage job = jobs[_jobId];\n        require(job.state == State.Submitted, \"NOT_SUBMITTED\");\n\n        // Checks-Effects-Interactions (CEI)\n        job.state = State.Released;\n        job.rating = _rating > 0 ? _rating : 5;\n        uint256 totalAmount = job.amount;\n        totalVaultLocked -= totalAmount;\n        totalReleased += totalAmount;\n        badgeCount[job.freelancer]++;\n\n        uint256 fee = (totalAmount * 25) / 1000; // 2.5% platform fee\n        uint256 payout = totalAmount - fee;       // 97.5% net payout\n\n        emit WorkApprovedAndPaid(_jobId, payout, fee, job.rating);\n        emit ProofBadgeMinted(_jobId, job.freelancer, job.title);\n\n        (bool successFreelancer, ) = payable(job.freelancer).call{value: payout}(\"\");\n        require(successFreelancer, \"PAYOUT_TRANSFER_FAILED\");\n\n        if (fee > 0) {\n            (bool successFee, ) = payable(owner).call{value: fee}(\"\");\n            require(successFee, \"FEE_TRANSFER_FAILED\");\n        }\n    }\n\n    /**\n     * @notice Step 4B: Client requests revision within agreed limit\n     */\n    function requestRevision(uint256 _jobId, string calldata _reason)\n        external\n        onlyClient(_jobId)\n    {\n        Job storage job = jobs[_jobId];\n        require(job.state == State.Submitted, \"NOT_SUBMITTED\");\n        require(job.revisionsUsed < job.maxRevisions, \"REVISION_LIMIT_EXCEEDED\");\n\n        job.revisionsUsed++;\n        job.state = State.RevisionRequested;\n\n        emit RevisionRequested(_jobId, _reason, job.revisionsUsed);\n    }\n\n    /**\n     * @notice Scenario B: Client goes silent -> anyone can trigger auto-release after reviewDeadline\n     */\n    function autoRelease(uint256 _jobId) external nonReentrant {\n        Job storage job = jobs[_jobId];\n        require(job.state == State.Submitted, \"NOT_SUBMITTED\");\n        require(block.timestamp >= job.reviewDeadline, \"WINDOW_ACTIVE\");\n\n        job.state = State.Released;\n        job.rating = 5;\n        uint256 totalAmount = job.amount;\n        totalVaultLocked -= totalAmount;\n        totalReleased += totalAmount;\n        badgeCount[job.freelancer]++;\n\n        uint256 fee = (totalAmount * 25) / 1000;\n        uint256 payout = totalAmount - fee;\n\n        emit AutoReleasedOnSilence(_jobId, payout, fee);\n        emit ProofBadgeMinted(_jobId, job.freelancer, job.title);\n\n        (bool successFreelancer, ) = payable(job.freelancer).call{value: payout}(\"\");\n        require(successFreelancer, \"PAYOUT_TRANSFER_FAILED\");\n\n        if (fee > 0) {\n            (bool successFee, ) = payable(owner).call{value: fee}(\"\");\n            require(successFee, \"FEE_TRANSFER_FAILED\");\n        }\n    }\n\n    /**\n     * @notice Scenario C: Freelancer never starts or client cancels before work begins\n     */\n    function claimRefund(uint256 _jobId) external nonReentrant onlyClient(_jobId) {\n        Job storage job = jobs[_jobId];\n        require(\n            job.state == State.Funded && (job.deadline == 0 || block.timestamp >= job.deadline || job.acceptedAt == 0),\n            \"CANNOT_REFUND\"\n        );\n\n        job.state = State.Refunded;\n        uint256 refundAmount = job.amount;\n        totalVaultLocked -= refundAmount;\n\n        emit RefundClaimed(_jobId, refundAmount);\n\n        (bool successClient, ) = payable(job.client).call{value: refundAmount}(\"\");\n        require(successClient, \"REFUND_TRANSFER_FAILED\");\n    }\n\n    /**\n     * @notice Step 4C / Scenario D: Raise dispute to 3-referee panel\n     */\n    function raiseDispute(uint256 _jobId, string calldata _evidence) external {\n        Job storage job = jobs[_jobId];\n        require(\n            msg.sender == job.client || msg.sender == job.freelancer,\n            \"NOT_JOB_PARTY\"\n        );\n        require(\n            job.state == State.Submitted || job.state == State.InProgress,\n            \"INVALID_DISPUTE_STATE\"\n        );\n\n        job.state = State.Disputed;\n        emit DisputeRaised(_jobId, msg.sender, _evidence);\n    }\n\n    /**\n     * @notice Scenario D: 2-of-3 Arbitrator voting panel\n     */\n    function castRefereeVote(uint256 _jobId, bool _favorFreelancer)\n        external\n        nonReentrant\n        onlyReferee\n    {\n        Job storage job = jobs[_jobId];\n        require(job.state == State.Disputed, \"NOT_DISPUTED\");\n        require(!hasVoted[_jobId][msg.sender], \"ALREADY_VOTED\");\n\n        hasVoted[_jobId][msg.sender] = true;\n\n        if (_favorFreelancer) {\n            votesForFreelancer[_jobId]++;\n        } else {\n            votesForClient[_jobId]++;\n        }\n\n        emit DisputeVoted(_jobId, msg.sender, _favorFreelancer);\n\n        // Check for 2-of-3 majority\n        if (votesForFreelancer[_jobId] >= 2) {\n            job.state = State.Released;\n            uint256 totalAmount = job.amount;\n            totalVaultLocked -= totalAmount;\n            totalReleased += totalAmount;\n            badgeCount[job.freelancer]++;\n\n            uint256 fee = (totalAmount * 25) / 1000;\n            uint256 payout = totalAmount - fee;\n\n            emit DisputeResolved(\n                _jobId,\n                State.Released,\n                votesForFreelancer[_jobId],\n                votesForClient[_jobId]\n            );\n            emit ProofBadgeMinted(_jobId, job.freelancer, job.title);\n\n            (bool success, ) = payable(job.freelancer).call{value: payout}(\"\");\n            require(success, \"DISPUTE_PAYOUT_FAILED\");\n\n            if (fee > 0) {\n                (bool successFee, ) = payable(owner).call{value: fee}(\"\");\n                require(successFee, \"FEE_TRANSFER_FAILED\");\n            }\n        } else if (votesForClient[_jobId] >= 2) {\n            job.state = State.Refunded;\n            uint256 refundAmount = job.amount;\n            totalVaultLocked -= refundAmount;\n\n            emit DisputeResolved(\n                _jobId,\n                State.Refunded,\n                votesForFreelancer[_jobId],\n                votesForClient[_jobId]\n            );\n\n            (bool success, ) = payable(job.client).call{value: refundAmount}(\"\");\n            require(success, \"DISPUTE_REFUND_FAILED\");\n        }\n    }\n\n    /**\n     * @notice Frontend helper to instantly sync entire vault statistics\n     */\n    function getVaultSummary()\n        external\n        view\n        returns (\n            uint256 totalLocked,\n            uint256 activeJobCount,\n            uint256 totalReleasedSum\n        )\n    {\n        uint256 activeCount = 0;\n        for (uint256 i = 1; i <= jobCounter; i++) {\n            State s = jobs[i].state;\n            if (\n                s == State.Funded ||\n                s == State.InProgress ||\n                s == State.Submitted ||\n                s == State.RevisionRequested ||\n                s == State.Disputed\n            ) {\n                activeCount++;\n            }\n        }\n        return (totalVaultLocked, activeCount, totalReleased);\n    }\n\n    function getJob(uint256 _jobId) external view returns (Job memory) {\n        return jobs[_jobId];\n    }\n\n    receive() external payable {\n        revert(\"DIRECT_DEPOSIT_REJECTED\");\n    }\n}\n";
