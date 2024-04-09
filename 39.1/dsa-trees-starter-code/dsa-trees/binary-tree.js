/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  // depth probably more useful here, using stack
  // everytime encounter leaf, record depth 

  minDepth() {
    // Empty root cas
    if (!this.root) return 0;

    let smallest= Infinity
    // Object with node and depth key 
    const toVisitStack = [{ node: this.root, depth: 1 }];


    while (toVisitStack.length) {
      const {node, depth} = toVisitStack.pop();
      //Encounter leaf, updates smallest if needed 
      if (!node.left && !node.right) {
        smallest = Math.min(smallest, depth)
      }
      // Can go deeper left, add to stack and augment depth
      if (node.left) {
        toVisitStack.push({ node: node.left, depth: depth + 1 });
      }
       // Can go deeper right, add to stack and augment depth
      if (node.right) {
        toVisitStack.push({ node: node.right, depth: depth + 1 });
      }
     
    } 

    return smallest
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
     // Empty root cas
     if (!this.root) return 0;
    
     let largest= 0
     // Object with node and depth key 
     const toVisitStack = [{ node: this.root, depth: 1 }];
 
     while (toVisitStack.length) {
       const {node, depth} = toVisitStack.pop();
       //Encounter leaf, updates largest if needed
       if (!node.left && !node.right) {
         largest = Math.max(largest, depth)
       }
       // Can go deeper left, add to stack and augment depth
       if (node.left) {
         toVisitStack.push({ node: node.left, depth: depth + 1 });
       }
        // Can go deeper right, add to stack and augment depth
       if (node.right) {
         toVisitStack.push({ node: node.right, depth: depth + 1 });
       }
      
     } 
     return largest
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {

    let result = 0;

    function maxSumHelper(node) {

      // Exit case for leaf
      if (node === null) return 0;

      // Recursively goes deeper using new node start 
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);

      // compares current highest (result) with new sum 
      result = Math.max(result, node.val + leftSum + rightSum);

      //add node val to recursive sum 
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    // Runs on the whole tree 
    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  // Breath approach, one layer at a time 

  nextLarger(lowerBound) {
    let larger = Infinity
    // queue starts at root 
    const toVisitQueue = [this.root]
    // No empty tree root
    if (!this.root) return null

    // going through queue and adding to sum
    while (toVisitQueue.length) {
      // Take front of the line's value and see if it's larger than lowerBound and less than larger
      const current = toVisitQueue.shift()
      if (current.val >lowerBound && current.val <larger) larger = current.val
      // Add its children to back of the line 
      if (current.right) toVisitQueue.push(current.right); 
      if (current.left) toVisitQueue.push(current.left); 
    } 
    return larger === Infinity ? null : larger;

  }

  
  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
