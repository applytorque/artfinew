import { getKeypair } from "./getkeyPair";

export const getAddress = (secretKey: string): string => {
    const keypair = getKeypair(secretKey);
    const address = keypair.getPublicKey().toSuiAddress();
    return address;
};
