function Node(data){
  this.data = data;
  this.left = null;
  this.right = null;
}

let tree = new Node("a1");
let child1 = new Node("bleft");
let child2 = new Node("bright");
let gChild1 = new Node("gc1");
let gChild2 = new Node("gc2");
let gChild3 = new Node("gc3");
let gChild4 = new Node("gc4");

function displayBreadthFirst(tree){
  
  let queue = []
  
  if(tree != null){
    queue.unshift(tree);
  }
  
  while(queue.length > 0){
    //shift to remove from front of queue
    let temp = queue.shift();
    
    console.log(temp.data);
    
    //push to end of queue
    if(temp.left != null){
      queue.push(temp.left);
    }
    if(temp.right != null){
      queue.push(temp.right);
    }
  }
}

function displayDepthFirst(tree){
 
  if(tree!=null){
    console.log(tree.data);
    
    displayDepthFirst(tree.left);
    displayDepthFirst(tree.right);
  }
}

tree.left = child1;
tree.right = child2;

child1.left = gChild1;
child1.right = gChild2;

child2.left = gChild3;
child2.right = gChild4;

console.log("*****Breadth First*****")
displayBreadthFirst(tree);

console.log("***** Depth First******")
displayDepthFirst(tree);
