const amqp = require('amqplib');

// setup queue name
const queueName = 'test-queue';

/**
 * consume the message
 */
async function consume() {
  // setup connection to RabbitMQ
  const connection = await amqp.connect(process.env.RABBITMQ_HOST || 'amqp://localhost');
  // setup channel
  const channel = await connection.createChannel();
  // make sure the queue created
  await channel.assertQueue(queueName, {
    durable: true,
  });
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
  // setup consume
  channel.consume(queueName, function (message) {
    // just print the message in the console
    console.log("[%s] Received with id (%s) message: %s", message.properties.correlationId, message.properties.messageId, message.content.toString());
    // ack manually
    channel.ack(message);
  }, {
    // we use ack manually
    noAck: false,
  });
}

consume();