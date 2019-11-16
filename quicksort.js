let items = [5,13,10,4,5,99,44,33,2,7,9]

function swap(arr, indexa, indexb){
  let temp = arr[indexa];
  arr[indexa] = arr[indexb];
  arr[indexb] = temp;
  let line = '';
  for(val of arr){
    line = line + ',' + val
  }
  console.log(line);
}

function partition(arr, low, hi){
  let i = low-1;
  let p = arr[low];
  let j = hi+1;
  do{
 
    do{
      i++;
    }while(arr[i] < p)
    
    do{
      j--;
    }while(arr[j] > p)
    
    if(i >= j){
      return j;
    }  
    swap(arr, i, j)
    
  }while(true);
  
  return i
}

function quickSort(arr, low, hi){  
  
  if(low < hi){
    let p = partition(arr, low, hi);
    quickSort(arr, low, p);
    quickSort(arr, p+1, hi);
  }
  
}

quickSort(items, 0, items.length-1);