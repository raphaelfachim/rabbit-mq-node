import amqp, { Connection, Channel } from 'amqplib';
import { MQConfig } from '../interfaces';
import MQService from '../interfaces/mqservice';

export class RabbitMQAdapter implements MQService{

    constructor(public mqConfig?: MQConfig) { }

    async createConnection(uri: string): Promise<Connection> {
        return amqp.connect(uri);
    }

    async createChannel(connection: Connection): Promise<Channel> {
        return connection.createChannel();
    }
    
    async sendMessage(channel: Channel, queue: string, message: string): Promise<void> {
        await channel.assertQueue(queue, {durable: false});
        channel.sendToQueue(queue, Buffer.from(message));
    }
}