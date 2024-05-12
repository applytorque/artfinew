// import { getKeypair } from "@/helper/getKeyPair";
// import { VESTING_PACKAGE_OBJECT_ID } from "@/utils/constants";
// import { TransactionBlock } from "@mysten/sui.js/dist/cjs/builder"
// import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/dist/cjs/client"
// import { log } from "console";


// interface entryNew {
//     suiClient: SuiClient
// }


// export const Create_new = async () => {
//     const suiClient: any = SuiClient
//     const client = new SuiClient({ url: getFullnodeUrl('devnet') });
//     const address = getKeypair("suiprivkey1qz9k5se8gp7vds9plh0wmxdqfwpwhlj4gxltust47nxseyzlh6egzae26up")

//     console.log(address, "address")

//     const newUserAddress: any = address.getPublicKey().toSuiAddress()
//     console.log(newUserAddress, "newAddress")

//     const tx = new TransactionBlock();

//     const startTime = 1682831812;
//     const endTime = 1782745412;

//     const coin = tx.splitCoins(tx.gas, [tx.pure(1000_000_000_000)])
//     tx.moveCall({
//         target: `${VESTING_PACKAGE_OBJECT_ID}::linear_vesting::new`,
//         arguments: [
//             coin,
//             tx.pure(startTime, "u8"),
//             tx.pure(endTime, "u8"),

//         ]
//     })
//     // 0x178677c5d9c959895bf59f22aef335a264fa3ff21815f1c8ee4a00e1fb9003a1
//     return suiClient.signAndExecuteTransactionBlock({
//         signer: newUserAddress,
//         transactionBlock: tx,
//         requestType: "WaitForLocalExecution",
//         options: {
//             showObjectChanges: true,
//             showEffects: true,
//         },
//     })
//         .then((resp: any) => {
//             console.log(resp, "response")
//             return resp
//         })
//         .catch((err: any) => {
//             console.log(err);
//             return undefined;
//         });
// }

