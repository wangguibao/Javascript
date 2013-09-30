var drawContext = null;
var bgLineStyle = "LightGray";
var fgLineStyle = "Red";
var whiteBgStyle = "White";

function Edge(v, w) {
    this.v = v;
    this.w = w;
}

function Graph(V) {
    this.V = V;
    this.E = 0;
    this.adj = [];                  // adjacency matrix
    this.pre = [];                  // preorder array
    this.cnt_pre = 0;               // preorder counter
    this.post = [];                 // postorder array
    this.cnt_post = 0;              // postorder counter

    /* Below properties are for graph drawing */
    this.X = 0.0;                   // Drawing area X
    this.Y = 0.0;                   // Drawing area Y
    this.loc = [];                  // vertex locations

    for (var i = 0; i < V; i++) {
        this.adj[i] = [];
        for (var j = 0; j < V; j++) {
            this.adj[i][j] = 0;
        }
    }
    
    var canvas = document.getElementById("canvas");
    drawContext = canvas.getContext("2d");
}

Graph.prototype.insertEdge = function(e) {
    var i = e.v;
    var j = e.w;
    if (i >= this.V || j >= this.V) {
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
    debugOutput(this.V + " vertices, " + this.E + " edges");
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
    drawContext.save();
    drawContext.font = "20px monospaced";
    debugOutput(drawContext.font);
    for (i = 0; i < this.V; i++) {
        drawContext.fillText(i.toString(), this.loc[i][0], this.loc[i][1]);
    }

    drawContext.beginPath();
    for (i = 0; i < this.V; i++) {
        for (j = i + 1; j < this.V; j++) {
            if (this.adj[i][j] == 1) {
                drawContext.moveTo(this.loc[i][0], this.loc[i][1]);
                drawContext.lineTo(this.loc[j][0], this.loc[j][1]);
            }
        }
    }
    drawContext.closePath();
    drawContext.strokeStyle = bgLineStyle;
    drawContext.lineWidth = 2;
    drawContext.stroke();

    drawContext.restore();
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

Graph.prototype.drawLine = function(v, w, style) {
    drawContext.save();
    drawContext.beginPath();
    drawContext.moveTo(this.loc[v][0], this.loc[v][1]);
    drawContext.lineTo(this.loc[w][0], this.loc[w][1]);
    drawContext.closePath();

    drawContext.strokeStyle = whiteBgStyle;
    drawContext.lineWidth = 2;
    drawContext.stroke();

    drawContext.beginPath();
    drawContext.moveTo(this.loc[v][0], this.loc[v][1]);
    drawContext.lineTo(this.loc[w][0], this.loc[w][1]);
    drawContext.closePath();

    drawContext.strokeStyle = style;
    drawContext.lineWidth = 2;
    drawContext.stroke();

    drawContext.restore();

}

Graph.prototype.dfsR = function(e) {
    var v = e.v;
    var w = e.w;
    this.pre[w] = this.cnt_pre++;

    if (v != w) {
        var graph = this;
        setTimeout(
            function() {
                var text = "";
                text = (v + "->" + w);
                debugOutput(text);
                graph.drawLine(v, w, fgLineStyle);
            },
            1500 * this.pre[w]);
    }

    for (var i = 0; i < this.V; i++) {
        if (this.adj[w][i] == 1 && this.pre[i] == -1) {
            this.dfsR(new Edge(w, i));
        }
    }
}

Graph.prototype.dfs = function() {
    var i;
    
    this.cnt_pre = 0;
    
    for (i = 0; i < this.V; i++) {
        this.pre[i] = -1;
    }
    
    for (i = 0; i < this.V; i++) {
        if (this.pre[i] == -1) {
            this.dfsR(new Edge(i, i));
        }
    }
    
    var line = "";
    for (i = 0; i < this.V; i++) {
        line += this.pre[i] + " ";
    }
    debugOutput(line);
}
