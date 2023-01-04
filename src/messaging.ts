import { CHANNEL_CREATED, CHANNEL_FAILED, CONNECTED, CONNECTION_FAILED, MQConfig } from "./infra/mq/interfaces";
import MQService from "./infra/mq/interfaces/mqservice";
import { RabbitMQAdapter } from "./infra/mq/rabbit-mq";

export const mqservice: MQService = new RabbitMQAdapter();
export var rabbitMQChannel: any;

const mqConfig: MQConfig = {
    url : "amqp://localhost",
    queue : "hello"
}

mqservice.createConnection(mqConfig.url)
    .then((conn) => {
        console.log(CONNECTED);
        
        mqservice.createChannel(conn)
            .then((channel) => {
                rabbitMQChannel = channel;
                console.log(CHANNEL_CREATED);
            })
            .catch((err) => {
                console.error(CHANNEL_FAILED, err);
            })
    })
    .catch((err) => {
        console.error(CONNECTION_FAILED, err);
    });




