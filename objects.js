//objects
//key value pairs
//every property is public
//objects
//not classy
//collection of key value pairs
//keys are known as properties
//properties can be of any type
//all properties are public
//
var person = {
    firstName: 'Joe',
    lastName: 'Smith',
    age: 45,
    getName: function(){
        return this.firstName + ' ' + this.MI + ' ' + this.lastName
    },
    address: {
        street: '123 B Ave',
        city: 'Austin',
        state: 'TX',
        zip: '76543'
    }
}

var cat = {
    firstName: 'White',
    lastName: 'Socks',
}

function display(o){
    console.log(o.firstName)
    console.log(o.lastName)
}

display(person)
display(cat)

























