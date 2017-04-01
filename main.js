var tree

// necessary function on P5
function setup() {
  noCanvas()

  tree = new Tree()
  tree.addValue(86)
  tree.addValue(23)
  tree.addValue(7)
  tree.addValue(6)
  console.log(tree)
  tree.traverse()
}

function Tree() {
  this.root = null
}

function Node(val) {
  this.value = val
  this.left = null
  this.right = null
}



Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n
    } else {
      this.left.addNode(n)
    }
  } else if (n.value > this.value){
      if(this.right == null) {
        this.right = n
      } else {
        this.right.addNode(n)
      }
  }
}

Node.prototype.visit = function() {
  if(this.left != null) {
    this.left.visit()
  }

  console.log(this.value)

  if (this.right != null) {
    this.right.visit()
  }
}

Tree.prototype.traverse = function() {
  this.root.visit()
}

Tree.prototype.addValue = function(val) {
  var n = new Node(val)
  if (this.root === null) {
    this.root = n
  } else {
    this.root.addNode(n)
  }
}
