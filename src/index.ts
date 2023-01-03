import amqp, { Connection, Channel } from 'amqplib';

console.log("[+] Iniciando transmissão da mensagem...");

amqp.connect("amqp://localhost")
    .then((connection: Connection) => {
        connection.createChannel().then((channel: Channel) => {
            console.log(">> Canal criado : " + channel);
            
            var queue = "hello";
            var msg = "Hello World from nodejs";
    
            channel.assertQueue(queue, { durable : false});
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log("[x] Sent message : '" + msg + "' as : '" + Buffer.from(msg) + "'");
            
        }).catch((error) => {
            console.log(">> Erro ao criar canal! >> " + error);
            
        })
    })
    .catch((error) => {
        console.log(">> Erro ao criar conexão com a fila! >> " + error);
        throw error;
    })