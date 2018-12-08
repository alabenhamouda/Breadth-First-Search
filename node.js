class Node{
    constructor(value){
        this.value = value;
        this.edges = [];
        this.searched = false;
        this.parent = null;
    }
    attach(node){
        this.edges.push(node);
        node.edges.push(this);
    }
    climb(arr = []){
        if(this.parent != null){
            arr = this.parent.climb(arr);
        }
        arr.push(this);
        return arr;
    }
    render(x, y){
        textAlign(CENTER, CENTER);
        textSize(40);
        text(this.value, x, y);
    }
}
class Movie extends Node{
    constructor(val){
        super(val);
    }
    
}
class Actor extends Node{
    constructor(val){
        super(val);
    }
    
}