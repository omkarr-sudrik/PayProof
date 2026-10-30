const fs = require('fs');
const path = require('path');
const solc = require('solc');

const contractPath = path.resolve(__dirname, '../../contracts/PayProofEscrow.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'PayProofEscrow.sol': {
      content: source,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    viaIR: true,
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode.object'],
      },
    },
  },
};

console.log('Compiling PayProofEscrow.sol with solc 0.8.20 and viaIR...');
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  let hasError = false;
  output.errors.forEach(err => {
    console.error(err.formattedMessage);
    if (err.severity === 'error') hasError = true;
  });
  if (hasError) {
    process.exit(1);
  }
}

const contract = output.contracts['PayProofEscrow.sol']['PayProofEscrow'];
const abi = contract.abi;
const bytecode = '0x' + contract.evm.bytecode.object;

fs.mkdirSync(path.resolve(__dirname, '../../contracts'), { recursive: true });
fs.writeFileSync(
  path.resolve(__dirname, '../../contracts/PayProofEscrow.json'),
  JSON.stringify({ abi, bytecode }, null, 2)
);

fs.mkdirSync(path.resolve(__dirname, '../../src/config'), { recursive: true });
const tsConfigContent = `// Auto-generated from contracts/PayProofEscrow.sol
export const PAYPROOF_ESCROW_ABI = ${JSON.stringify(abi, null, 2)} as const;

export const PAYPROOF_ESCROW_BYTECODE = "${bytecode}";

export const PAYPROOF_ESCROW_SOURCE = ${JSON.stringify(source)};
`;

fs.writeFileSync(
  path.resolve(__dirname, '../../src/config/payProofContract.ts'),
  tsConfigContent
);

console.log('✅ Compilation successful! Created PayProofEscrow.json and src/config/payProofContract.ts');
