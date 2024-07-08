const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

const merkleTree = new MerkleTree(niceList);

async function main() {
  const name = process.argv[2];

  if (!name) {
    console.log("Please enter a name!");
    return;
  }

  const idx = niceList.findIndex((n) => n === name);

  const proof = merkleTree.getProof(idx);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();

