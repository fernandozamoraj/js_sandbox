function PriorityQue(){
  
  var innerQue = [null]
  var self = this
  
  function maxHeap(){
    let pos = innerQue.length-1
    let temp = innerQue[pos]
   
    while(pos > 1 && self.compare( innerQue[Math.floor(pos/2)], innerQue[pos]) <= 0){
      let middlePos = Math.floor(pos/2)
      temp = innerQue[middlePos]
      innerQue[middlePos] = innerQue[pos]
      innerQue[pos] = temp
      pos = middlePos
    }    
  }
  
  this.compare = function(a, b){
    return a - b;
  }
  
  this.add = function(x){
      innerQue.push(x)
      maxHeap()
  }
  
  this.printQue = function(){
    let result = '['
    for(let i=1;i<innerQue.length;i++){
      result +=  (',{ x: ' + innerQue[i].x + ', y: ' + innerQue[i].y + '}, ')
    }
    
    result += ']'
    
    console.log(result)
  }
  
  this.peek = function(){
    
    if(innerQue.length > 1){
      return innerQue[1]
    }
    
    return null
  }
  
  this.deque = function(){
    
    if(innerQue.length == 1)
      return null
    if(innerQue.length == 2)
      return innerQue.pop();
    
    orderBySequence()
    swapFirstAndLast()
    let next = innerQue.pop()
    
    shiftDown()
    
    return next
  }
  
  /*
     When two items have the same priority
     this helps push out the next one based 
     on the sequence it was enqued
  */
  function orderBySequence(){
    //check for queue sequence if priorities are the
    //same
    if(self.compare(innerQue[1], innerQue[2]) == 0){
    
       if(innerQue[1].y > innerQue[2].y){
           
           let temp = innerQue[1]
           innerQue[1] = innerQue[2]
           innerQue[2] = temp
       }
    }
    
    if(innerQue.length >= 4){
      if(self.compare(innerQue[1], innerQue[3]) == 0){
    
         if(innerQue[1].y > innerQue[3].y){
           
           let temp = innerQue[1]
           innerQue[1] = innerQue[3]
           innerQue[3] = temp
         }
      }      
    }

  }
  
  /*
     We swap first and last because in a max heap
     the next item in the queue is at the root (index 1).
     But we need to pop it off from the end so
     we switch the first with the last and pop from
     the end.
     That makes it easier to keep the order by then
     pushing the item in position 1 down until it finds
     it's proper place in the sequence.
  
  */
  function swapFirstAndLast(){
    let temp = innerQue[1];
    let lastIndex = innerQue.length - 1
    innerQue[1] = innerQue[lastIndex];
    innerQue[lastIndex] = temp;
    
  }
  
  /*
     Push the first item (root, index 1)
     down to it's proper location in the sequence
  */
  function shiftDown(){
    let parent = 1
    let swapped  = true
    while(swapped){
      
      swapped = false
      let l = parent * 2
      let r = parent*2 + 1
      let largest = parent
      
      let line = "l: " + l + " r: " + r + " parent: " + parent;
      //console.log(line)
      
      if(l < innerQue.length && self.compare(innerQue[l], innerQue[parent]) > 0){
        largest = l
      }
      if(r < innerQue.length && self.compare(innerQue[r], innerQue[largest]) > 0){
        largest = r;
      }
      
      if(parent != largest){
        let temp1 = innerQue[largest]
        innerQue[largest] = innerQue[parent]
        innerQue[parent] = temp1
        parent = largest
        swapped = true
      }      
    }
  }
    
}

que = new PriorityQue();

que.compare = function(a,b){
  return b.x - a.x
}

que.add({x: 4, y:1})
que.printQue()

que.add({x: 3, y:2})
que.printQue()

que.add({x: 2, y:3})
que.printQue()

que.add({x: 1, y:4})
que.printQue()

que.add({x: 5, y:5})
que.printQue()

que.add({x: 6, y:6})
que.printQue()

que.add({x: 7, y:7})
que.printQue()

que.add({x: 8, y:8})
que.printQue()

que.add({x: 5, y:9})
que.printQue()

que.add({x: 5, y:10})
que.printQue()

que.add({x: 7, y:11})
que.printQue()

que.add({x: 5, y:12})
que.printQue()

while(que.peek() != null){

  let x = que.deque()
  console.log("Next: " + x.x + ", " + x.y)
  que.printQue()
}

