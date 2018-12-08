class Graph {
    constructor(){
        this.start = null;
        this.end = null;
    }
    addNode(node){
        this[node.value] = node
    }
    getActor(val){
        if(val in this) return this[val];
        else {
            let actor = new Actor(val);
            this.addNode(actor);
            return actor;
        }
    }
    set from(st){
        if(st in this)
        this.start = this.getActor(st);
    }
    set to(ed){
        if(ed in this)
        this.end = this.getActor(ed);
    }
    search(){
        let queue = [];
        queue.push(this.start);
        while(queue.length > 0){
            let current = queue.shift();
            current.searched = true;
            if(current === this.end){
                let path = current.climb();
                return path;
            }
            let edges = current.edges.filter(edge => !edge.searched)
            for(let edge of edges){
                edge.parent = current;
                queue.push(edge);
            }
        }
        return null;
    }
    get path(){
        if(this.start !== null && this.end !== null){
            this.reset();
            return this.search();
        }
        else throw(new Error('start or end property is null'));
    }
    reset(){
        for(let node in this){
            if (node === 'end' || node === 'start') continue;
            this[node].parent = null;
            this[node].searched = false;
        }
    }
}