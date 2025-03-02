const { NotImplementedError } = require('../extensions/index.js')
const { Node } = require('../extensions/list-tree.js')

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null
  }

  root() {
    return this.rootNode
  }

  add(data) {
    const newNode = new Node(data)

    if (!this.rootNode) {
      this.rootNode = newNode
      return
    }

    let current = this.rootNode
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode
          return
        }
        current = current.left
      } else if (data > current.data) {
        if (!current.right) {
          current.right = newNode
          return
        }
        current = current.right
      } else {
        return
      }
    }
  }

  has(data) {
    return !!this.find(data)
  }

  find(data) {
    let current = this.rootNode
    while (current) {
      if (data === current.data) return current
      current = data < current.data ? current.left : current.right
    }
    return null
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data)
  }

  _removeNode(node, data) {
    if (!node) return null

    if (data < node.data) {
      node.left = this._removeNode(node.left, data)
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data)
    } else {
      if (!node.left) return node.right
      if (!node.right) return node.left

      let minRight = this._findMin(node.right)
      node.data = minRight.data
      node.right = this._removeNode(node.right, minRight.data)
    }
    return node
  }

  min() {
    return this._findMin(this.rootNode)?.data || null
  }

  max() {
    return this._findMax(this.rootNode)?.data || null
  }

  _findMin(node) {
    while (node?.left) node = node.left
    return node
  }

  _findMax(node) {
    while (node?.right) node = node.right
    return node
  }
}

module.exports = {
  BinarySearchTree,
}
