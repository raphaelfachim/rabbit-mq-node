import { Channel, Connection } from "amqplib";

export interface MQService {

    createConnection(uri: string): Promise<Connection>;
    createChannel(connection: Connection): Promise<Channel>;
    sendMessage(channel: Channel, queue: string, message: string): Promise<void>;
}