let names = ['z', 'x', 'u', 't', 'm', 'l', 'k']



function bubbleSort(list){
  let swapped = false
  let k = 1
  let iterCount = 0
  
  do{
    swapped = false
    let i = 0
    let last = list.length - k
    for(i = 0; i < last; i++){
      if(list[i] > list[i+1]){
        let temp = list[i]
        list[i] = list[i+1]
        list[i+1] = temp
        swapped = true
      }
      iterCount++
    }
    k++
  }while(swapped)
  console.log('Iter count: ' + iterCount)
}


console.log(names)
console.log('sorting...')
bubbleSort(names)
console.log(names)