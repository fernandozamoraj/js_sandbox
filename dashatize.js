//super long solution
//very brute force
//but it will do for now
function dashatize(num) {

  if(num!=num)
     return 'NaN'
     
  if(num < 0)
  {
    num *= -1
  }
  
  let stringNums = num.toString()
  let numsArray = []
  let finalString = ''
  
  //special case
  if(stringNums.length == 1){
    return stringNums[0].toString()
  }
  
  for(let i = 0; i < stringNums.length; i++){
    
    if(!(parseInt(stringNums[i]) % 2 == 0)){
      
      if(i===0){
        numsArray[i] = stringNums[i] +'-'
      }
      else if(i==stringNums.length-1){
        numsArray[i] = '-' + stringNums[i]
      }
      else{
        numsArray[i] = '-'+stringNums[i]+'-'
      }
    }
    else{
      numsArray[i] = stringNums[i]
    }
  }
  
  finalString = numsArray.join('')
    
  while(finalString.indexOf('--') >= 0){
    
    finalString = finalString.replace('--', '-');
  }
  
  return finalString;
};