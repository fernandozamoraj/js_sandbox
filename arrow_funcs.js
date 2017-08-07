//arrow functions (ES6)
function foo(x, y, mycallback){

    var z = mycallback(x, y)
    console.log(z)
}

foo("mary", "jones", function(x, y){
    return x + " " + y
})

foo("joe", "smith", (x, y) => {
        x + " "+ y
    }
)




