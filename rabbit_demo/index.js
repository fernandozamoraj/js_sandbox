let rabbit = require('./rabbit')

const consumeHandler = (message) =>{
    console.log(`Handled in consumeHandler: ${message}`)
}
rabbit.setUp('amqp://localhost', '','', 'fz.orders.email', consumeHandler)
rabbit.publish("Test 1 from console")
rabbit.publish("Test 2 from console")


