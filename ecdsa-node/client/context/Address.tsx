import React, { ReactNode, createContext, useContext, useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak224, keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

const DEFAULT_STATE: Record<string, string> = {};

const AddressContext = createContext({ addresses: DEFAULT_STATE });

const generateAddress = () => {
  const privateKey = secp256k1.utils.randomPrivateKey();
  const publicKey = secp256k1.getPublicKey(privateKey, true);

  const address = keccak224(publicKey.slice(1)).slice(-20);
  return { [`0x${toHex(address)}`]: `0x${toHex(privateKey)}` };
};

const hashAndSignMsg = (message: string, privateKey: string) => {
  const textEncoder = new TextEncoder();
  const hashMsg = keccak256(textEncoder.encode(message));
  const signature = secp256k1.sign(toHex(hashMsg), privateKey.slice(2));

  return {
    hashMsg,
    signature,
  };
};

const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState(generateAddress());

  console.log(addresses);
  console.log(hashAndSignMsg("Hello", Object.values(addresses)[0]));

  return (
    <AddressContext.Provider value={{ addresses }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);

export default AddressProvider;
