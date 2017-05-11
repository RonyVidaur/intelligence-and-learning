var data
var graph

function preload() {
  data = loadJSON('js/bacon.json')
}

function setup() {
  graph = new Graph()
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
      }

      graph.addNode(actorNode)
      movieNode.addEdge(actorNode)
    }
  }

  var start = graph.setStart('Kevin Bacon')
  var end = graph.setEnd('Kevin Bacon')

  console.log(graph)
  var queue = []

  start.searched = true
  queue.push(start)
  while (queue.length > 0) {
    var current = queue.shift()
    if (current == end) {
      console.log("Found " + current.value)
    }
  }
}
