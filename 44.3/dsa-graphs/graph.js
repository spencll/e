class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {

    // Taking care of adjacencies 
    for (let node of this.nodes){
      if (node.adjacent.has(vertex)) this.removeEdge(vertex, node)
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // Array for returning 
    let arr = []
    // Stack start 
    let stack = [start]
    // Tracker
    let seen = new Set(stack)
    while (stack.length>0){
      let curr = stack.pop()
      arr.push(curr.value)
      // Adding neighbors to stack if not seen yet
      for (let adjacent of curr.adjacent){
        if (!seen.has(adjacent)) {
          stack.push(adjacent)
          seen.add(adjacent)  
        }
      }

    }
    return arr
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
  // Array for returning 
  let arr = []
  // Queue start 
  let queue = [start]
  //  Tracker
  let seen = new Set(queue)
  while (queue.length>0){
    // First in line exits
    let curr = queue.shift()
    arr.push(curr.value)
    // Adding neighbors to stack if not seen yet
    for (let adjacent of curr.adjacent){
      if (!seen.has(adjacent)) {
        queue.push(adjacent)
        seen.add(adjacent)  
      }
    }

  }
  return arr



  }
}

module.exports = {Graph, Node}