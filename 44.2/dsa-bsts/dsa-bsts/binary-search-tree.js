class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {

    // empty tree 
  if (!this.root) {
      this.root = new Node(val); 
      return this;
  }

  // node tracker 
  let current = this.root;

  while (current) {
      // left pathway 
      if (val < current.val) {

        // Empty left child, insert there 
          if (!current.left) {
              current.left = new Node(val);
              return this;
          }
          //pointer onto left child
          current = current.left;

      } else {
         // Empty right child, insert there 
          if (!current.right) {
              current.right = new Node(val); 
              return this;
          }
        //pointer onto right child 
          current = current.right;
      }
  }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  // Need the current tracker as param
  insertRecursively(val) {

      // empty tree 
  if (!this.root) {
    this.root = new Node(val); 
    return this;
}


// Recursion function 
const insertNode = (current) => {

  // Base case 
  if (!current) {
      return new Node(val);
  }

  // Recurse left
  if (val < current.val) {
      current.left = insertNode(current.left);
  } 
   // Recurse right
  else {
      current.right = insertNode(current.right);
  }
  // function returns current node
  return current;
};

// Start recursion at the root 
this.root = insertNode(this.root);
return this;
    
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

    // pointer 
    let current = this.root;

    // success 
    while (current) {
      if (current.val === val) 
        return current;

      //pointer change  
      current = val < current.val
                ? current.left
                : current.right;
    }

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {

// Recursion function with current as pointer 
const findNode = (current) => {
    // Base case failure, nothing to point at 
    if (!current) {
      return undefined;
  }
  // Base case success
  if (current.val ===val) {
      return current;
  }
  // Recurse left
  if (val < current.val) {
    return findNode(current.left);
  } 
   // Recurse right
  else {
    return findNode(current.right);
  }
};
// Start recursion at the root 
return findNode(this.root);
  }


  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  // root, traverse left, traverse right 
  dfsPreOrder() {

    // Arr tracker 
 const arr=[]
 
    const traverse = (current) => {
         // Base case, nothing to point at. End that path with empty return. 
         if (!current) {
          return;
      }
      // pre order push
      arr.push(current.val)
    // Recurse left
        traverse(current.left);
     // Recurse right
      traverse(current.right);
    } 

      // Start traversing from root 
      traverse(this.root)

      // Returns final arr after everything done 
      return arr

  };

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
  // Arr tracker 
  const arr=[]
 
  const traverse = (current) => {
       // Base case, nothing to point at. End that path with empty return. 
       if (!current) {
        return;
    }
  
  // Recurse left
      traverse(current.left);

        // in order push
    arr.push(current.val)

   // Recurse right
    traverse(current.right);
  } 

    // Start traversing from root 
    traverse(this.root)

    // Returns final arr after everything done 
    return arr


  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
      // Arr tracker 
  const arr=[]
 
  const traverse = (current) => {
       // Base case, nothing to point at. End that path with empty return. 
       if (!current) {
        return;
    }
  
  // Recurse left
      traverse(current.left); 

   // Recurse right
    traverse(current.right);

            // post  order push
            arr.push(current.val)
  } 

    // Start traversing from root 
    traverse(this.root)

    // Returns final arr after everything done 
    return arr

  }

  /** bfs(): Traverse the array using BFS. Row by row 
   * Return an array of visited nodes. */

  bfs() {

     // arr for results
     const arr = [];

        // Queue tracker 
  const queue=[this.root]
 
   // Iterate over the queue until nothing
   while (queue.length > 0) {

    // Dequeue pointer node 
    const current = queue.shift();
    
    //Pointer node goes into result array 
    arr.push(current.val);
    
    // Enqueue the left child if it exists
    if (current.left) {
        queue.push(current.left);
    }
    // Enqueue the right child if it exists
    if (current.right) {
        queue.push(current.right);
    }
}

// Return the traversal result
return arr;
}


  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
