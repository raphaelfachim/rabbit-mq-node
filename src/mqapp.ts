import amqp, { Connection, Channel } from 'amqplib';

export const MQConfig = {
    url : "amqp://localhost",
    queue : "hello"
}

export class RabbitMQAdapter {

    public connection: Connection;
    public channel: Channel;

    constructor( ) { }

    async createConnection(url: string): Promise<void> {
        this.connection = await amqp.connect(url);
        this.channel = await this.connection.createChannel();

    }
    
    async sendMessage(queue: string, message: string): Promise<void> {
        await this.channel.assertQueue(queue, {durable: false});
        this.channel.sendToQueue(queue, Buffer.from(message));
    }
}