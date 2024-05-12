# Dapp + Contract on SUI Blockchain

Artfi token: https://suiscan.xyz/devnet/coin/0xc23df6d2d55665bfa280ac7438b42de377a6f9ba612b33a74a7c53e24ef9a30a::artfi::ARTFI/txs

Vesting Contract: https://suiscan.xyz/devnet/object/0x884d99970a4c88de9c77bbe5912e959f35937e0d8c4a48b76d34a1f5473b145e/contracts
Staking contract: https://suiscan.xyz/devnet/object/0xa5463df347e56710717ba3a176d2b179663fa7e793d611759ebbe4d92b82bb5b/contracts


## Run Locally

Install dependencies

```bash
npm run dev
npm run build
npm run start
```

For SUI Contract Build

PS: You need **Rust**, **Move** & **SUI Binaries** install on your system.

```bash
sui move build
```

```bash
sui client publish --gas-budget 1000
```
