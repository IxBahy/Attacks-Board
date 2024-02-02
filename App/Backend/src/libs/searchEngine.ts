import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: process.env.ELASTIC_URL });
