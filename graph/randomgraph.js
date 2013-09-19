function randomVertex(V)
{
    return Math.floor(Math.random() * V);
}

function randomGraph(V, E) {
    var graph = new Graph(V);

    while (graph.E < E) {
	graph.insertEdge(new Edge(randomVertex(V), randomVertex(V)));
    }

    return graph;
}
