var graph = new Graph();

function setup(){
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    background(220);
    let options = [];
    let from = createSelect();
    let to = createSelect();
    from.position(10, 10).attribute('name', 'from');
    to.position(500, 10).attribute('name', 'to');
    for(let select of [from, to]){
        select.changed((e) => {
            background(220);
            graph[e.target.name] = e.target.value;
            let path = graph.path;
            console.log(path);
            const x = width/2;
            const margin = 40;
            let y = 50;
            for(let node of path){
                node.render(x, y);
                if (node === graph.end) break;
                y += margin;
                y = arrow(x, y);
                y += margin;
            }
        })
    }
    for(let movie of data.movies){
        let movieNode = new Movie(movie.title);
        graph.addNode(movieNode);
        for(let actor of movie.cast){
            let actorNode = graph.getActor(actor);
            movieNode.attach(actorNode);
            if(!options.includes(actor)){
                options.push(actor);
                from.option(actor);
                to.option(actor);
            }
        }
    }
}

function arrow(x,y){
    const xOffset = 30;
    const arrLength = 50;
    const xOffset2 = xOffset + 10;
    const head = arrLength + 20;
    beginShape();
    vertex(x-xOffset, y);
    vertex(x-xOffset, y+arrLength);
    vertex(x-xOffset2, y+arrLength);
    vertex(x, y+head);
    vertex(x+xOffset2, y+arrLength);
    vertex(x+xOffset, y+arrLength);
    vertex(x+xOffset, y);
    endShape(CLOSE);
    return y + arrLength;
}
