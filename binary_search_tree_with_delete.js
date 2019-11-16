
let root = null

const add = (val) =>{
  
  if(root === null ){
    root = { val: val, parent: null, left: null, right: null }
    return
  }    
   
  let current = root
  let newNode = { val: val, parent: null, left: null, right: null }
  while(newNode.parent == null){
    
    if(newNode.val < current.val){
      if(current.left === null){
         newNode.parent = current
         current.left = newNode
      }
      else{
        current = current.left        
      }
    }
    else{
      if(current.right === null){
        newNode.parent = current;
        current.right = newNode
      }
      else{
        current = current.right
      }
    }
  }
}

//prints the tree sideways... the left is the top
//the top is the right
//and the left is the bottom
const print = (node, tabs) =>{
  if(node === null){
    return
  }
  
  let realTabs = ''
  for(let i=0; i < tabs; i++)
    realTabs = realTabs + '     '
    
  print(node.right, tabs + 1)
  console.log(realTabs + node.val)
  print(node.left, tabs + 1)
}

const find = (val) => {
  
  let current = root
  
  while(current !== null){
    
    if(current.val === val)
      return current
      
    if(val < current.val){
      current = current.left
    }
    else{
      current = current.right
    }
  }
  
  return null
}

const remove = (val) => {
  
  let target = find(val)
  
  if(target === null)
    return;
  
  /*
    The code is really confusing.
    The concept is not as confusing though.
    If you understand the concept you will find it much easier to 
    understand the code.
    The basic premise is that you always prune from the left
    sub-tree unless there is no left sub tree.
    By pruning I really mean swap the data.
    So you just swap the data with the oldest member of the
    left sub tree.
    If there is no left sub-tree then you must swap with
    with the youngest member of the right sub tree.
    That will allow the tree to stay in form of BST.
    
  */
  if(target.left){
    if(target.left.right){
      let oldest = target.left
      while(oldest.right)
        oldest = oldest.right
        
      target.val = oldest.val
      
      if(oldest.left){
        oldest.left.parent = oldest.parent 
        oldes.parent.right = oldest.left
      }
      else{
        oldest.parent.right = null        
      }      
    }
    else{
      target.val = target.left.val
      if(target.left.left){
        target.left.left.parent = target.left.parent
      }
      target.left = target.left.left
    }
  }
  else if(target.right){
    
    if(target.right.left){
      let youngest = target.right
      while(youngest.left)
        youngest = youngest.left
        
      target.val = youngest.val
      
      if(youngest.right){
        youngest.right.parent = youngest.parent
        youngest.parent.left = youngest.right
      }
      else{
         youngest.parent.left = null    
      }
    }
    else{
      target.val = target.right.val
      if(target.right.right){
        target.right.right.parent = target.right.parent
      }
      
      target.right =target.right.right
    }
  }
  else{
    if(target.val < target.parent.val)
      target.parent.left = null
    else
      target.parent.right = null
  }
}

add(10)
add(5)
add(15)
add(2)
add(7)
add(12)
add(17)
add(1)
add(3)
add(6)

console.log("***********************")
print(root, 1)

remove(17)
console.log("***********************")
print(root, 1)


remove(15)
console.log("***********************")
print(root, 1)

remove(5)
console.log("***********************")
print(root, 1)

remove(2)
console.log("***********************")
print(root, 1)

remove(1)
console.log("***********************")
print(root, 1)


remove(3)
console.log("***********************")
print(root, 1)

add(18)
console.log("***********************")
print(root, 1)

add(20)
console.log("***********************")
print(root, 1)

add(19)
console.log("***********************")
print(root, 1)

remove(18)
console.log("***********************")
print(root, 1)


remove(10)
console.log("***********************")
print(root, 1)

remove(7)
console.log("***********************")
print(root, 1)

remove(6)
console.log("***********************")
print(root, 1)