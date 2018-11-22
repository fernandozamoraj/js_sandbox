function Node(val){
    this.value = val;
    this.left = null;
    this.right = null;
}
  
function addNode(node, val){
    console.log(`Adding ${val}`);
    let temp = node;
    let parent = null;
    const SAFETY_VALVE = 1000;
    let count  =0;
    while(temp != null && count < SAFETY_VALVE){
      parent = temp;
    
      if(val < temp.value){
        temp = temp.left;
      }
      else if(val >= temp.value){
        temp = temp.right;
      }
      count++;
    }
    
    if(parent != null){
      if(val < parent.value){
        parent.left = new Node(val);
      }
      else{
        parent.right = new Node(val);
      }
    }
}

//DELETE CASE 1: Delete Leaf
function deleteLeaf(node, parent){
    
    let handled = false;
    let isLeaf = node.left == null && node.right == null;
    if(isLeaf){
      if(node.value < parent.value){
        
        if(parent != null)
          parent.left = null;
      }
      else{

        if(parent != null)
          parent.right = null;
      }
      
      handled = true;
    }

    return handled;
}

//DELETE CASE 2: Promote Right Child
function promoteRightChild(node, parent){
    
    let handled = false;
    
    if(node.left == null && node.right != null){
      if(node.value < parent.value){
         parent.left = node.right;
         node.right = null;
       }
       else{
         parent.right = node.right;
         node.right = null;
      }
      
      handled = true;
    }
    
    return handled;
}


//DELETE CASE 3: Promote Left Child
function promoteLeftChild(node, parent){

    let handled = false;
    if(node.right == null && node.left != null){
       if(node.value < parent.value){
          parent.left = node.left;
          node.left = null;
       }
       else{
          parent.right = node.left;
          node.left = null;
       }
      
      handled = true;
    }
    
    return handled;
}

//DELETE CASE 4: All hell breaks lose
//This is one of the ugliest pieces of code that I've written
//at this point in my career.
//There are other solutions but this one is mine.
//Sure, I could have copied someone else's solution but I probably
//wouldn't have the same level of understanding.
function findAndPromoteSuccessor(node, parent){
    
    let hasLeftAndRightChildSubTrees = node.left != null && node.right != null;
    let handled = false;
    
    if(hasLeftAndRightChildSubTrees){
    
      //I put a safety valve because... you never know when
      //you have tangled up your tree relationships and have
      //created a circular reference.
      //The safety valve allows the function to end at the limit
      //If you have a real tree you may still want a safety valve
      //but it should be configurable so that you can increase it
      //to a number larger than you need to ensure not suffocating
      //your algorithm.  I've done trees with thousands of records
      //and who knows how large would be sufficient but erroring out
      //early is better than running in an endless loop or a stack overflow.
      const SAFETY_VALVE = 1000; 
      let count = 0;
      let firstChild = node.right;
      let successor = null;
      let successorParent = null;
      
      /*
                          20
                 12  <--- target (node)
                 
            6          18 <--first child (right child)
        3      9   15     19 <--successor is 15 but (leftmost child of first child)
                    16  <--save the orphan 16
      
      
        In the above case 18 is the first child and also the successor's
        parent.  That is not always the case. Sometimes the successor
        may be further down the tree and the successor's parent will be
        a left granchild of the first child.
        We need the successor's parent because if the successor has
        children on the right subtree (16) we need to make those
        childre the left subtree of the successor's parent.
        
        So if we were deleting 12 above the tree would look like this
        
                   20
               15   <--- succesor replaced the target
           6
        3     9   18  <--- successor parent (18) adoptep the successors child 16
                 16 19 
      */
      
      
      if(firstChild.left != null){
          successorParent = firstChild;
          successor = firstChild.left;
            
          //find the smallest child in that left line
          //that will be your successor.
          //Track the parent in case the succesor has children
          //The parent gets to adopt the grandchild tree
          while(successor.left != null && count < SAFETY_VALVE){
            successorParent = successor;
            successor = successor.left;
            count++;
          }
      }
          
      if(successor == null){
           firstChild.left = node.left;
           parent.right = firstChild;
      }
      else{

         parent.right = successor;            
         
         //just in case the successor has a right child
         //it obviously does not have left child because
         //we walked all the way down as far left as we could
         successorParent.left = successor.right;              
            
         successor.left = node.left;
         successor.right = node.right;
            
      }
      
      handled = true;
    }
    
    return handled;
}

   
function deleteNode(root, val){
    let current = root;
    let parent = null;
    let SAFETY_VALVE = 2000;
    let count = 0;
    let handled = false;
    
    while(current != null && count < SAFETY_VALVE){
      count++;
      if(val < current.value){
        parent = current;
        current = current.left;
      }
      else if(val > current.value){
        parent = current;
        current = current.right;
      }
      else{ //found our target val == current.value
        
        let deleteRoot;
        //create temporary parent when we are working with the root
        //the reason I chose to create a fake parent is so that
        //the delete functions don't have to check for null parent
        //that way everything works as if root is just another child
        //node
        //This fake parent is only temporary
        if(parent == null){
          parent = new Node(current.value - 1); //to ensure the temp will be it's right child
          parent.right = current;
          deleteRoot = true;
        }
        
        //brute force chain of responsiblity
        handled = 
          deleteLeaf(current, parent) ||
          promoteRightChild(current, parent) ||
          promoteLeftChild(current, parent) ||
          findAndPromoteSuccessor(current, parent);
        

        //point node to the new root for return later
        if(deleteRoot){
          root = parent.right;
          parent.right = null;
        }
        
        current = null;
      }
    }

    if(handled){
      console.log(`${val} was found for deletion`);
    }
    else{
       console.log(`${val} was not found for deletion`);
    }


    if(count >= SAFETY_VALVE){
        console.log("!!!!Released by safety valve!!!!!!!")
    }
    
    //Have to return the root because if the root was the target
    //we must update it.
    return root;
}
  
function print2DUtil(root, space) 
{ 
    //safety mechanism
    if(space > 1000){
        return;
    }

    if(space == 0){
        console.log("******************PRINTING TREE****************");
    }
    const COUNT = 10;
    
    if (root == null) 
        return; 
    
    space += COUNT; 
    
    print2DUtil(root.right, space); 
    
    let line = "";
    // Print current node after space 
    // count 
      
    for (let i = COUNT; i < space; i++){
        line += " "; 
    } 
    
    line += root.value + "<"; 
    console.log(line);
    
    // Process left child 
    print2DUtil(root.left, space); 
}  
  
let tree = new Node(20);
addNode(tree, 10);
addNode(tree, 30);
addNode(tree, 5);
addNode(tree, 15);
addNode(tree, 25);
addNode(tree, 35);
  
print2DUtil(tree, 0);
tree = deleteNode(tree, 15);
tree = deleteNode(tree, 10);
print2DUtil(tree, 0);
addNode(tree, 2);
addNode(tree, 1);
addNode(tree, 3);
print2DUtil(tree, 0);
tree = deleteNode(tree, 5);
tree = deleteNode(tree, 25);
print2DUtil(tree, 0);
addNode(tree, 33);
addNode(tree, 37);
print2DUtil(tree, 0);
tree = deleteNode(tree, 30);
print2DUtil(tree, 0);
tree = deleteNode(tree, 35);
print2DUtil(tree, 0);
addNode(tree, 43);
addNode(tree, 38);
addNode(tree, 41);
print2DUtil(tree, 0);
tree = deleteNode(tree, 37);
print2DUtil(tree, 0);
tree = deleteNode(tree, 20); //delete root
print2DUtil(tree, 0);
tree = deleteNode(tree, 100); //attempt to delete node that does not exists
   


