// import { SuiClient } from "@mysten/sui.js/client";
// import { TransactionBlock } from "@mysten/sui.js/transactions";

// import { getKeypair } from "./getKeyPair";

// interface SponsorAndSignTransactionProps {
//     suiClient: SuiClient;
//     tx: TransactionBlock;
// }

// export const sponsorAndSignTransaction = async ({
//     tx,
//     suiClient,
// }: SponsorAndSignTransactionProps) => {
//     const adminKeypair = getKeypair(process.env.ADMIN_SECRET_KEY!);
//     const txBytes = await tx.build({
//         client: suiClient,
//         onlyTransactionKind: true,
//     });
//     const sponsoredTransaction = await sponsorTransaction({
//         txBytes,
//         forceFailure: false,
//     });
//     if (!sponsoredTransaction) {
//         throw new Error("Sponsoring transaction failed");
//     }
//     const signedTransaction = await adminKeypair.signTransactionBlock(
//         await TransactionBlock.from(sponsoredTransaction.txBytes).build({
//             client: suiClient,
//         })
//     );
//     return {
//         signedTransaction,
//         sponsoredTransaction,
//     };
// };
