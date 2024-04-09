/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  // Doesn't matter depth or breath, so I choose breath

  sumValues() {
    let sum = 0
    // queue starts at root 
    const toVisitQueue = [this.root]
    // No empty tree root
    if (!toVisitQueue[0]) return sum

    // going through queue and adding to sum
    while (toVisitQueue.length && toVisitQueue[0]) {
      // Take front of the line's value
      const current = toVisitQueue.shift()
      sum += current.val
      // Add its children to back of the line 
      if (current.children && current.children.length > 0) {
        toVisitQueue.push(...current.children); 
      }
    } 
    return sum
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  // going depth first to change it up

  countEvens() {
    let evens= 0 
    const toVisitStack = [this.root];
    // No empty tree root
    if (!toVisitStack[0]) return evens
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      if (current.val %2 ===0) {
        evens ++
      }
      // Add its children to the top of the stack
      if (current.children && current.children.length > 0) {
        toVisitStack.push(...current.children); 
      }
    } 
    return evens 
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  

  numGreater(lowerBound) {
    let counter= 0 
    const toVisitStack = [this.root];
    // No empty tree root
    if (!toVisitStack[0]) return counter

    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      if (current.val >lowerBound) {
        counter ++
      }
      // Add its children to the top of the stack
      if (current.children && current.children.length > 0) {
        toVisitStack.push(...current.children); 
      }
    } 
    return counter
  }

}

module.exports = { Tree, TreeNode };
