var tree

// necessary function on p5
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
