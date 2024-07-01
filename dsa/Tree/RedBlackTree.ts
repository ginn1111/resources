import { nodeModuleNameResolver } from 'typescript';

class Node {
  left: Node | null;
  right: Node | null;
  parent: Node | null;
  color: 'RED' | 'BLACK';
  value: number;

  constructor(value: number) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;
    this.color = 'RED';
  }
}

/**
 * Insertion
 * After perform the BST insertion, the new node always has red color,
 *  - If parent node is black, do not make any thing
 *  - If parent node is red, check the uncle node
 *    + If uncle node is red, recolour the parent node and uncle node to black from the grandparent.
 *      + If grandparent is root, do not recolour, otherwise, recolour the grandparent to red and repeat the process from grandparent
 *    + If uncle node is black, there are 4 cases:
 *      + Left Left Case -> rotate right
 *      + Left Right Case -> rotate left and right
 *      + Right Right Case -> rotate left
 *      + Right Left Case -> rotate right and left
 *      + After rotate, we recolour to according cases:
 *        + LL and RR, swap color of grandparent and parent
 *          + LL case the parent is root and the grandparent is root.right
 *          + RR case the parent is root and the grandparent is root.left
 *        + RL and LR, swap color of grandparent and new node
 *          + RL case the parent is root and the grandparent is root.left
 *          + LR case the parent is root and the grandparent is root.right
 *
 * Deletion
 * After perform the BST deletion (have one child, two child and no any child)
 *  - We call u is the deleted node, v is the parent of u
 *  - The double BLACK occur when u and v is black node (NULL is also BLACK node -> u is NULL and v is left)
 *  - If the double BLACK occur, this depend on sibling (this ensure is not root)
 *
 *    + If the sibling is BLACK and has at least one RED child:
 *      + If the sibling is left child and the RED child is left child -> LL case -> rotate right(p) // p is parent of sibling
 *        + Otherwise LR case -> rotate left and rotate right(p)
 *      + The similar for right sibling
 *    + If the sibling is RED rotate to move the OLD sibling up and recolour the OLD sibling and parent
 *      + If sibling is the left child of parent -> L case -> rotate right(p)
 *      + Other wise R case -> rotate left(p)
 *    + If u is root make it to BLACK (NULL) and return
 */

class RedBlackTree {
  root: Node | null;
  ll: boolean;
  rl: boolean;
  rr: boolean;
  lr: boolean;

  constructor() {
    this.root = null;
    this.ll = false;
    this.rl = false;
    this.rr = false;
    this.lr = false;
  }

  leftRotate(root: Node) {
    const rightChild = root.right!;
    const leftRightChild = rightChild.left;

    rightChild.left = root;
    root.right = leftRightChild;

    root.parent = rightChild;

    if (leftRightChild) {
      leftRightChild.parent = root;
    }

    return rightChild;
  }

  rightRotate(root: Node) {
    const leftChild = root.left!;
    const rightLeftChild = leftChild.right;

    leftChild.right = root;
    root.left = rightLeftChild;

    root.parent = leftChild;

    if (rightLeftChild) {
      rightLeftChild.parent = root;
    }

    return leftChild;
  }

  _insert(root: Node | null, value: number): Node {
    if (!root) return new Node(value);

    let f = false;

    if (value < root.value) {
      root.left = this._insert(root.left, value);
      root.left.parent = root;
      if (root != this.root) {
        if (root.color == 'RED' && root.left.color == 'RED') {
          f = true;
        }
      }
    } else if (value > root.value) {
      root.right = this._insert(root.right, value);
      root.right.parent = root;

      if (root != this.root) {
        if (root.color == 'RED' && root.right.color == 'RED') {
          f = true;
        }
      }
    }

    if (this.ll) {
      // rotate left
      root = this.leftRotate(root);
      root.color = 'BLACK';
      root.left!.color = 'RED';
      this.ll = false;
    } else if (this.rl) {
      root.right = this.rightRotate(root.right!);
      root.right.parent = root;
      root = this.leftRotate(root);
      root.color = 'BLACK';
      root.left!.color = 'RED';
      this.rl = false;
      // rotate right and left
    } else if (this.rr) {
      // rotate right
      root = this.rightRotate(root);
      root.color = 'BLACK';
      root.right!.color = 'RED';
      this.rr = false;
    } else if (this.lr) {
      // rotate left and right
      root.left = this.leftRotate(root.left!);
      root.left.parent = root;
      root = this.rightRotate(root);
      root.color = 'BLACK';
      root.right!.color = 'RED';
      this.lr = false;
    }

    if (f && root.parent) {
      // is left child
      if (root.parent.left == root) {
        // right uncle
        if (root.parent.right == null || root.parent.right.color == 'BLACK') {
          // rotate
          if (root.left != null && root.left.color == 'RED') {
            // ll case  -> rotate right
            this.rr = true;
          } else if (root.right != null && root.right.color == 'RED') {
            // left right case -> rotate left and right
            this.lr = true;
          }
        } else {
          root.color = 'BLACK';
          root.parent.right.color = 'BLACK';

          if (root.parent != this.root) {
            root.parent.color = 'RED';
          }
        }
      }
      // is right child
      else {
        // left uncle
        if (root.parent.left == null || root.parent.left.color == 'BLACK') {
          if (root.left != null && root.left.color == 'RED') {
            // right left case -> rotate right and left
            this.rl = true;
          } else if (root.right != null && root.right.color == 'RED') {
            // right right case -> rotate left
            this.ll = true;
          }
        } else {
          root.color = 'BLACK';
          root.parent.left.color = 'BLACK';
          if (root != this.root) {
            root.parent.color = 'RED';
          }
        }
      }

      f = false;
    }
    return root;
  }

  hasOneRED(node: Node) {
    return node.left?.color === 'RED' || node.right?.color === 'RED';
  }

  insert(value: number) {
    if (this.root == null) {
      const newNode = new Node(value);
      newNode.color = 'BLACK';
      this.root = newNode;
    } else {
      this.root = this._insert(this.root, value);
    }
  }

  findLeftMost(node: Node): Node {
    let curr = node;

    while (curr.left) {
      curr = curr.left;
    }

    return curr;
  }

  inOrder(root = this.root) {
    if (!root) return;

    console.log(root.value);
    this.inOrder(root.left);
    this.inOrder(root.right);
  }
}

export default RedBlackTree;
