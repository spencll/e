/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */
// contains head and tail
class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  _get(idx) {
    //goes through list to find idx node
    let cur = this.head;

    //exit while loop once count becomes index 
    for (let i=0;i<idx;i++) {
      cur = cur.next;
    }

    return cur;
  }


  /** push(val): add new value to end of list. */

  push(val) {
      // New node created with value of val
      let newNode= new Node(val)
      // If nothing in list, node becomes the head
      if (this.head===null) this.head = newNode;
      // If tail exists, make tail.next the node
      if (this.tail !== null) this.tail.next=newNode;
      //makes tail the node
      this.tail = newNode;
      //length counter
      this.length +=1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    // New node created with value of val
    let newNode = new Node(val)
    //if starting with nothing, node becomes head/tail
    if (this.length===0) this.head= this.tail = newNode
    //if starting with something, next becomes old head and node becomes new head 
    else {
    newNode.next= this.head
    this.head = newNode
    }
    //length counter
    this.length +=1;
    }
  /** pop(): return & remove last item. */

  pop() {
    // knocks out tail and changes next to null
    return this.removeAt(this.length-1)

  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0)
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    //Checks idx is between 0 and length of linked list 
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    return this._get(idx).val
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    this._get(idx).val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {


    let newNode = new Node(val)
    //inserting at head, run unshift function
    if (idx === 0) return this.unshift(val);
    //inserting at tail, run push function
    if (idx === this.length) return this.push(val);
    //getting previous node 
    let prev = this._get(idx-1)
    //new node -> prev.next
    newNode.next = prev.next;
    //prev -> new node
    prev.next = newNode
    //counter
    this.length +=1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    //getting previous node
    let prev = this._get(idx - 1);



    //Removing head
    if (idx === 0) {
      let val = this.head.val;
      //shifting head to next one
      this.head = this.head.next;
      this.length -= 1;
      //only two things, tail becomes head now
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    //Removing tail
    if (idx === this.length - 1) {
      let val = prev.next.val;
      //prev becomes tail and next is null
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    //getting removed value
    let val = prev.next.val
    //need to connect previous next to previous next next 
    prev.next = prev.next.next
    //counter
    this.length -=1;
    //return removed item
    return val

  }

  /** average(): return an average of all values in the list */

  average() {
    //empty list
    if (this.length===0) return 0

    //keep going next
    let total = 0;
    let cur = this.head
    //goes until cur becomes null
    while (cur){
      total += cur.val
      cur = cur.next
    }
    return total/this.length;
  }
}

module.exports = LinkedList;
