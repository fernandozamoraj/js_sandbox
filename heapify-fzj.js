//Demonstration of heapifying an unordered array into an ordered heap
//each parent node must be greater than each of its child nodes
let heap = [1,5,8,4,3,4,9,12,34,7,40]
let iterCount = 0
let swapped = false;
let swapCount = 0;
//          1 2 3 4 5 6 7 8  9  10 


//                     1
//                5         8 
//            4      3    4    9
//         12   34  7

function left(i){
    return  i * 2
    
} 

function right(i){
    return i*2 + 1
}

function log(msg){
   // console.log(msg);	//uncomment for debugging
}

function heapify(heap, i){
   
   let l = left(i)
   let r = right(i)
   let largest = i
   iterCount++

   log("------------------------------");
   log(heap);
   log(" i is " +i+" is " + heap[i-1]);

    if( l <= heap.length && heap[l-1] > heap[i-1]){
        log("Left  "+l+ " is " + heap[l-1]);
        largest = l
    }
   
    if( r <= heap.length && heap[r-1] > heap[largest-1]){
        log("Right "+r+ " is " + heap[r-1]);
        largest = r
    }


    log("Largest in " + i + " is " + heap[largest-1]);

    if(largest != i){
	swapCount++
        swapped = true;
        log("Largest is " + heap[largest-1]);

        let temp = heap[largest-1]
        heap[largest-1] = heap[i-1]
        heap[i-1] = temp 
        heapify(heap, largest) 
    }
}

let x = 0;

console.log("*****************");
console.log("Starting Heap: ");
console.log(heap);
console.log("*****************");
let checked = []

do{
   swapped = false;

   let index0 = heap[0];
   for(x=1; x<=heap.length; x++){
       
       if(checked.includes(heap[x-1]) == false){
          
          heapify(heap, x); 
          log(heap);
       }
   }

   checked.push(index0);

   
}while(swapped == true);

console.log("*****************");
console.log("Ending Heap: ");
console.log(heap);
console.log("iter count: " + iterCount);
console.log("Swap count: " + swapCount); 
console.log("*****************");


