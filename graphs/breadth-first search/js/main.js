var data
var graph
var dropdown

function preload() {
  data = loadJSON('js/bacon.json')
}

function setup() {
  graph = new Graph()
  dropdown = createSelect()
  dropdown.changed(breadthFirstSearch)
  noCanvas()

  const movies = data.movies

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i].title
    var cast = movies[i].cast
    var movieNode = new Node(movie)
    graph.addNode(movieNode)
    for (var j = 0; j < cast.length; j++) {
      var actor = cast[j]
      var actorNode = graph.getNode(actor)
      if (!actorNode) {
        var actorNode = new Node(actor)
        dropdown.option(actor)
      }

      graph.addNode(actorNode)
      movieNode.addEdge(actorNode)
    }
  }
}

function breadthFirstSearch() {
  graph.reset()
  var start = graph.setStart(dropdown.value())
  var end = graph.setEnd('Kevin Bacon')

  console.log(graph)
  var queue = []

  start.searched = true
  queue.push(start)
  while (queue.length > 0) {
    var current = queue.shift()
    if (current == end) {
      console.log("Found " + current.value)
      break
    }
    var edges = current.edges
    for (var i = 0; i < edges.length; i++) {
      var neighbor = edges[i]
      if(!neighbor.searched) {
        neighbor.searched = true
        neighbor.parent = current
        queue.push(neighbor)
      }
    }
  }
  var path = []
  path.push(end)
  var next = end.parent
  while (next != null) {
    path.push(next)
    next = next.parent
  }
  var text = ''
  for (var i = path.length - 1; i >= 0 ; i--) {
    var n = path[i]
    text += n.value
    if (i != 0) {
      text += ' --> '
    }

  }
  // part of p5.dom
  createP(text)
}
