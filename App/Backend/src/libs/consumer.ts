import { Kafka } from "kafkajs";
import "dotenv/config";

const kafka = new Kafka({
	clientId: "client-1",
	brokers: ["localhost:9092"],
});

const topic = "attacks-output-stream" as const;
const GROUP_ID = "test-group" as const;
const consumer = kafka.consumer({ groupId: GROUP_ID });

export const consume = async (cb: (Buffer) => any) => {
	await consumer.connect();
	await consumer.subscribe({ topic, fromBeginning: false });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log(
				"::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
			);
			const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
			console.log(`- ${prefix} #${message.value}`);
			cb(message.value.toString());
		},
	});
};
