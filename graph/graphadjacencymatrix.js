function Edge(v, w) {
    this.v = v;
    this.w = w;
}

function Graph(V) {
    this.V = V;
    this.E = 0;
    this.adj = [];				// adjacency matrix

    /* Below properties are for graph drawing */
    this.X = 0.0;				// Drawing area X
    this.Y = 0.0;				// Drawing area Y
    this.loc = [];				// vertex locations

    var i;
    var j;
    for (i = 0; i < V; i++) {
	this.adj[i] = [];
	for (j = 0; j < V; j++) {
	    this.adj[i][j] = 0;
	}
    }
}

Graph.prototype.insertEdge = function(e) {
    var i = e.v;
    var j = e.w;
    if (i >= 10 || j >= 10) {
    	console.log(i + ", " + j);
	return;
    }
    if (this.adj[i][j] == 0) {
	this.adj[i][j] = 1;
	this.adj[j][i] = 1;
	this.E++;
    }
}

Graph.prototype.removeEdge = function(e) {
    var i = e.v;
    var j = e.w;
    if (this.adj[i][j] == 1) {
	this.adj[i][j] = 0;
	this.adj[j][i] = 0;
	this.E--;
    }
}

Graph.prototype.getEdges = function() {
    var i;
    var j;
    var edges = [];

    for (i = 0; i < this.V; i++) {
	for (j = i + 1; j < this.V; j++) {
	    if (this.adj[i][j] == 1) {
		edges.push(new Edge(i, j));
	    }
	}
    }

    return edges;
}

Graph.prototype.show = function() {
    var i;
    var j;
    console.log(this.V + " vertices, " + this.E + " edges");
    var line;

    for (i = 0; i < this.V; i++) {
	line = "";
	for (j = 0; j < this.V; j++) {
	    line += this.adj[i][j] + " ";
	}
	console.log(line);
    }
}

Graph.prototype.draw = function()
{
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.save();
    context.beginPath();
    for (i = 0; i < this.V; i++) {
	context.fillText(i.toString(), this.loc[i][0], this.loc[i][1]);
    }
    context.closePath();
    context.font = "14pt bold mono";
    context.fillStyle = "#ffffee";
    context.stroke();
 
    context.beginPath();
    for (i = 0; i < this.V; i++) {
	for (j = i + 1; j < this.V; j++) {
	    if (this.adj[i][j] == 1) {
		context.moveTo(this.loc[i][0], this.loc[i][1]);
		context.lineTo(this.loc[j][0], this.loc[j][1]);
	    }
	}
    }
    context.closePath();
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.stroke();

    context.restore();
}

Graph.prototype.arrangeVertices = function(X, Y) {
    this.X = X;
    this.Y = Y;

    var i;
    for (i = 0; i < this.V; i++) {
	var x = Math.floor(Math.random() * this.X);
	var y = Math.floor(Math.random() * this.Y);
	this.loc[i] = [x, y];
    }
}

