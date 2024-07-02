import { useState } from "react";
import { useAddress } from "../context/Address";
import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  const { addresses } = useAddress();
  const [input, setInput] = useState("");

  async function onChange(evt) {
    const address = evt.target.value;
    setInput(address);
    // setAddress(address);
    // if (address) {
    //   const {
    //     data: { balance },
    //   } = await server.get(`balance/${address}`);
    //   setBalance(balance);
    // } else {
    //   setBalance(0);
    // }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={input}
          onChange={onChange}
        ></input>
      </label>
      Private key:
      {addresses[input] ? addresses[input] : ""}
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
