//callbacks
function find(myArr, myCallBack){
    
    for(var i=0; i < myArr.length; i++){
        if(myCallBack(myArr[i])){
            return i
        }
    }
    
    return -1
}

var x = [{name: 'joe'}, 
         {name: 'mary'}, 
         {name: 'anne'}]


var myCb = function(x){
    if(x.name == 'anne'){
        return true
    }
    return false
}

var y = find(x, myCb)

console.log(y)







