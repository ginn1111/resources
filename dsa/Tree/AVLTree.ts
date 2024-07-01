import BinarySearchTree, { Node } from './BinarySearchTree';

/**
 * AVL Tree
 * AVL Tree is a self-balancing binary search tree.
 * Satisfied the conditions:
 *   - The difference between heights of left and right subtrees cannot be more than 1
 * After insertion and deletion, the tree will be balanced
 * The AVL Tree perform balance belong to balance factor, formula: b_factor = |h_left - h_right|
 *  if b_factor > 1 -> left heavy -> rotate right
 *    Some case with left heavy:
 *       1. left left case: rotate right
 *        2. left right case: rotate left first, then rotate right
 *  else b_factor < -1 -> right heavy -> rotate left
 *
 *
 *  Left lef case -> rotate right
 *             r
 *            /  \
 *           y*   2
 *          /  \
 *    x -> z    3
 *        / \
 *       k   null <- T2
 *
 *             r
 *            /  \
 *           y*   2
 *          /  \
 *    x -> z    3
 *        / \
 *       k
 *  null <- T2
 * Left right case -> rotate left first, then rotate right
 *               x
 *            /  \
 *           z    2
 *          / \
 *         y   3
 *          \
 *           x
 *
 * Right right case -> rotate left
 *             x
 *            /  \
 *           2    z
 *               / \
 *              6   y
 *                   \
 *                    x
 *
 * Right left case -> rotate right first, then rotate left
 *             x
 *            /  \
 *           2    z
 *               / \
 *              4   y
 *                  /
 *                 x
 */
class AVLTreeNode {
  private _height: number;
  private _left: AVLTreeNode | null;
  private _right: AVLTreeNode | null;
  private _value: number;

  constructor(val: number) {
    this._height = 1;
    this._value = val;
    this._left = null;
    this._right = null;
  }

  get left() {
    return this._left;
  }

  set left(node: AVLTreeNode | null) {
    this._left = node;
  }

  get right() {
    return this._right;
  }

  set right(node: AVLTreeNode | null) {
    this._right = node;
  }

  get value() {
    return this._value;
  }

  set value(val: number) {
    this._value = val;
  }

  get height() {
    return this._height;
  }

  set height(h: number) {
    this._height = h;
  }
}

class AVLTree {
  private root: AVLTreeNode | null;

  constructor() {
    this.root = null;
  }

  // right rotate
  isLeftCase(node: AVLTreeNode, val: number) {
    const balance = this.getBalance(node);
    return balance > 1 && val < node.left!.value;
  }

  // left rotate
  isRightCase(node: AVLTreeNode, val: number) {
    const balance = this.getBalance(node);
    return balance < -1 && val > node.right!.value;
  }

  // first left rotate of left child, then right rotate at current node
  isLeftRightCase(node: AVLTreeNode, val: number) {
    const balance = this.getBalance(node);
    return balance > 1 && val > node.left!.value;
  }

  //  first, right rotate of right child, then left rotate a current node
  isRightLeftCase(node: AVLTreeNode, val: number) {
    const balance = this.getBalance(node);
    return balance < -1 && val < node.right!.value;
  }

  getBalance(node: AVLTreeNode) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  getHeight(node: AVLTreeNode | null) {
    if (!node) return 0;

    return node.height;
  }

  calcHeight(node: AVLTreeNode) {
    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  leftRotate(node: AVLTreeNode) {
    const rightChild = node.right!;
    const leftRightChild = rightChild.left;

    rightChild.left = node;
    node.right = leftRightChild;

    this.calcHeight(node);
    this.calcHeight(rightChild);

    return rightChild;
  }

  rightRotate(node: AVLTreeNode) {
    const leftChild = node.left!;
    const rightLeftChild = leftChild.right;

    leftChild.right = node;
    node.left = rightLeftChild;

    this.calcHeight(node);
    this.calcHeight(leftChild);

    return leftChild;
  }

  _insert(root: AVLTreeNode | null, val: number): AVLTreeNode {
    if (!root) return new AVLTreeNode(val);

    if (val < root.value) {
      root.left = this._insert(root.left, val);
    } else if (val > root.value) {
      root.right = this._insert(root.right, val);
    }

    this.calcHeight(root);

    if (this.isLeftCase(root, val)) {
      return this.rightRotate(root);
    } else if (this.isRightCase(root, val)) {
      return this.leftRotate(root);
    } else if (this.isLeftRightCase(root, val)) {
      root.left = this.leftRotate(root.left!);
      return this.rightRotate(root);
    } else if (this.isRightLeftCase(root, val)) {
      root.right = this.rightRotate(root.right!);
      return this.leftRotate(root);
    }

    return root;
  }

  insert(val: number) {
    this.root = this._insert(this.root, val);
  }

  _delete(root: AVLTreeNode | null, val: number): AVLTreeNode | null {
    if (root == null) return null;

    if (val < root.value) {
      root.left = this._delete(root.left, val);
    } else if (val > root.value) {
      root.right = this._delete(root.right, val);
    } else {
      if (root.left == null) {
        root = root.right;
      } else if (root.right == null) {
        root = root.left;
      } else {
        const leftMost = this.findLeftMost(root.right);

        root!.value = leftMost.value;

        this._delete(root.right, leftMost.value);
      }
    }

    if (root == null) return null;

    this.calcHeight(root);
    if (this.isLeftCase(root, val)) {
      return this.rightRotate(root);
    } else if (this.isRightCase(root, val)) {
      return this.leftRotate(root);
    } else if (this.isLeftRightCase(root, val) && root.left) {
      root.left = this.leftRotate(root.left);
      return this.rightRotate(root);
    } else if (this.isRightLeftCase(root, val) && root.right) {
      root.right = this.rightRotate(root.right);
      return this.leftRotate(root);
    }

    return root;
  }

  findLeftMost(root: AVLTreeNode): AVLTreeNode {
    if (root.left == null) return root;

    return this.findLeftMost(root.left);
  }

  delete(val: number) {
    this.root = this._delete(this.root, val);
  }

  preOrder(root = this.root) {
    if (!root) return;
    console.log(root.value);
    this.preOrder(root.left);
    this.preOrder(root.right);
  }
}

export default AVLTree;
