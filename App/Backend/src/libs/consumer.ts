import { Kafka } from "kafkajs";

const kafka = new Kafka({
	clientId: "client-1",
	brokers: [process.env.BROKER_URL],
});

const topic = "attacks-output-stream" as const;
const GROUP_ID = "test-group" as const;
const consumer = kafka.consumer({ groupId: GROUP_ID });

export const consume = async (cb) => {
	await consumer.connect();
	await consumer.subscribe({ topic, fromBeginning: true });
	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
			console.log(`- ${prefix} ${message.key}#${message.value}`);
			cb(message.value);
		},
	});
};
