function Node(val){
    this.value = val;
    this.left = null;
    this.right = null;
  }
  
  function addNode(node, val){
    let temp = node;
    let parent = null;
    
    while(temp != null){
      parent = temp;
      if(val < temp.value){
        temp = temp.left;
      }
      else if(val >= temp.value){
        temp = temp.right;
      }
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
    
    while(temp != null){
      
      if(val < temp.value){
        parent = temp;
        temp = temp.left;
      }
      else if(val > temp.value){
        parent = temp;
        temp = temp.right;
      }
      else{
        
        //delete leaf
        if(temp.left == null && temp.right == null){
          if(temp.value < parent.value){
            parent.left = null;
          }
          else{
            console.log("deleting " + temp.value)
            parent.right = null;
          }
        }
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
        temp = null;
      }
    }
    
    return node;
  }
  
  function print2DUtil(root, space) 
  { 
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