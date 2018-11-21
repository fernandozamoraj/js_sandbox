function Node(val){
    this.value = val;
    this.left = null;
    this.right = null;
  }
  
  function addNode(node, val){
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
  
  function deleteNode(node, val){
    let temp = node;
    let parent = null;
    let SAFETY_VALVE = 2000;
    let count = 0;
    
    console.log("deleting " + val);
    
    while(temp != null && count < SAFETY_VALVE){
      count++;
      if(val < temp.value){
        parent = temp;
        temp = temp.left;
      }
      else if(val > temp.value){
        parent = temp;
        temp = temp.right;
      }
      else{
        //We have found our target
        //case 1: delete leaf
        if(temp.left == null && temp.right == null){
          if(temp.value < parent.value){
            parent.left = null;
          }
          else{

            parent.right = null;
          }
        }
        //Case 2: promote up because it only has a right tree
        else if(temp.left == null){
          if(temp.value < parent.value){
            parent.left =temp.right;
            temp.right = null;
          }
          else{
            parent.right = temp.right;
            temp.right = null;
          }
        }
        //Case 3: promote up because it only has a left tree
        else if(temp.right == null){
          if(temp.value < parent.value){
            parent.left =temp.left;
            temp.left = null;
          }
          else{
            parent.right = temp.left;
            temp.left = null;
          }
        }
        //Case 4: Has 2 sub trees
        else{
          let firstChild = temp.right;
          let successor = null;
          let successorParent = null;
          if(firstChild.left != null){
            successorParent = firstChild;
            successor = firstChild.left;
            
            while(successor.left != null && count < SAFTEY_VALVE){
              successorParent = successor;
              successor = successor.left;
              count++;
            }
          }
          
          if(successor == null){
            firstChild.left = temp.left;
            parent.right = firstChild;
          }
          else{

            parent.right = successor;
            
            if(successorParent != null && successor.right != null ){
              successParent.left = successor.right;              
            }
            
            successor.right = temp.right;
          }
        }


        temp = null;
      }
    }

    if(count >= SAFETY_VALVE){
        console.log("!!!!Released by safety valve!!!!!!!")
    }
    
    return node;
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
      
      for (let i = COUNT; i < space; i++) 
          line += " "; 
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
  addNode(tree, 42);
  print2DUtil(tree, 0);
  tree = deleteNode(tree, 37);
  print2DUtil(tree, 0);


