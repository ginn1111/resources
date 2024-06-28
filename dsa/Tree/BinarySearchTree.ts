class Node {
  private _val: number | null;
  private _left: Node | null;
  private _right: Node | null;

  constructor(val: number | null = null) {
    this._val = val;
    this._left = null;
    this._right = null;
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  get val() {
    return this._val as number;
  }

  set left(left: Node | null) {
    this._left = left;
  }

  set right(right: Node | null) {
    this._right = right;
  }

  set val(val: number) {
    this._val = val;
  }
}

class BinarySearchTree {
  private _root: Node | null;

  constructor() {
    this._root = null;
  }

  set root(root: Node | null) {
    this._root = root;
  }

  get root() {
    return this._root;
  }

  insert(val: number) {
    this._root = this._insert(this._root, val);
  }

  delete(val: number) {
    this._root = this._delete(this._root, val);
  }

  private _insert(root: Node | null, val: number) {
    if (root == null) return new Node(val);

    if (root) {
      if (val < root.val) {
        root.left = this._insert(root.left, val);
      } else if (val > root.val) {
        root.right = this._insert(root.right, val);
      }
    }

    return root;
  }

  _delete(root: Node | null, val: number): Node | null {
    if (!root) return null;

    if (val < root.val) {
      root.left = this._delete(root.left, val);
    } else if (val > root.val && root.right) {
      root.right = this._delete(root.right, val);
    }

    if (val == root.val) {
      if (root.left == null) {
        root = root.right;
      } else if (root.right == null) {
        root = root.left;
      } else {
        const leftMost = this.findLeftMost(root.right);

        root.val = leftMost.val;

        this._delete(root.right, root.val);
      }
    }

    return root;
  }

  findLeftMost(root: Node): Node {
    if (root.left == null) return root;

    return this.findLeftMost(root.left);
  }

  preOrder() {
    this._preOrder(this._root);
  }

  inOrder() {
    this._inOrder(this._root);
  }

  postOrder() {
    this._postOrder(this._root);
  }

  _preOrder(root: Node | null) {
    if (!root) return;

    console.log(root.val);
    this._preOrder(root.left);
    this._preOrder(root.right);
  }

  _inOrder(root: Node | null) {
    if (!root) return;

    this._inOrder(root.left);
    console.log(root.val);
    this._inOrder(root.right);
  }

  _postOrder(root: Node | null) {
    if (!root) return;

    this._postOrder(root.left);
    this._postOrder(root.right);

    console.log(root.val);
  }

  _drawTree(root: Node | null, height: number) {
    if (!root) return;

    console.log(' '.repeat(height), root.val);

    let edge = '';
    if (root.left) {
      console.log(' '.repeat(height - 2) + '/');
      this._drawTree(root.left, height);
    }

    if (root.right) {
      console.log('  \\');
      this._drawTree(root.right, height + 4);
    }
  }

  _getHeight(root: Node | null, height = 0): number {
    if (!root) return height;

    const leftHeight = this._getHeight(root.left, height + 1);
    const rightHeight = this._getHeight(root.right, height + 1);

    return Math.max(leftHeight, rightHeight);
  }

  getHeight() {
    return this._getHeight(this._root);
  }

  drawTree() {
    const heightOfTree = this.getHeight();
    this._drawTree(this._root, heightOfTree);
  }

  breadthFirstSearch() {
    const height = this.getHeight();
    let leftSpace = height;
    let rightSpace = height;
    if (!this._root) return;

    const queue = [this._root];

    console.log(' '.repeat(height), queue[0].val);

    leftSpace -= 2;

    while (queue.length) {
      const item = queue.shift()!;
      let edge = ' '.repeat(leftSpace);

      if (item.left) {
        queue.push(item.left);
      }

      if (item.right) {
        queue.push(item.right);
      }
    }
  }
}

export { Node };
export default BinarySearchTree;
