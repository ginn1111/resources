interface Proof {
  data: string;
  left: boolean;
}

class MerkleTree {
  leaves: string[];
  concat: (...args: [string, string]) => string;

  constructor(leaves: string[], concat: (...args: [string, string]) => string) {
    this.leaves = leaves;
    this.concat = concat;
  }

  getRoot(leaves = [...this.leaves]): string {
    if (leaves.length === 1) return leaves[0];

    const nextLeaves: string[] = [];

    for (let i = 0; i < leaves.length; i += 2) {
      if (i < leaves.length - 1) {
        nextLeaves.push(this.concat(leaves[i], leaves[i + 1]));
      } else {
        nextLeaves.push(leaves[i]);
      }
    }

    return this.getRoot(nextLeaves);
  }

  getProof(idx: number, proofs: Proof[] = [], leaves = [...this.leaves]) {
    if (leaves.length === 1) return proofs;

    if (idx & 1) {
      proofs.push({
        data: leaves[idx - 1],
        left: true,
      });
    } else {
      if (idx + 1 < leaves.length) {
        proofs.push({
          data: leaves[idx + 1],
          left: false,
        });
      }
    }

    const nextLeaves: string[] = [];

    for (let i = 0; i < leaves.length; i += 2) {
      if (i < leaves.length - 1) {
        nextLeaves.push(this.concat(leaves[i], leaves[i + 1]));
      } else {
        nextLeaves.push(leaves[i]);
      }
    }

    return this.getProof(Math.floor(idx / 2), proofs, nextLeaves);
  }

  verify(idx: number) {
    const proofs = this.getProof(idx);
    const root = this.getRoot();

    let hashProofs: string = this.leaves[idx];

    for (const p of proofs) {
      hashProofs = p.left
        ? this.concat(p.data, hashProofs)
        : this.concat(hashProofs, p.data);
    }

    console.log(root, hashProofs);

    return root === hashProofs;
  }
}

const mklTree = new MerkleTree(
  "ABCDEFGHIJ".split(""),
  (a: string, b: string) => `H(${a},${b})`,
);

console.log(mklTree.getRoot());
console.log(mklTree.getProof(2));
console.log(mklTree.verify(2));
