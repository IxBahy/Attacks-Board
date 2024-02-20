import { Client } from "@elastic/elasticsearch";
import {
	CountRequest,
	CountResponse,
	QueryDslQueryContainer,
	SearchRequest,
	SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";
import "dotenv/config";
import { isIpRange } from "../routes/searchRoutes";

////////////////////////////////////////////////////////
//////////////////////////Types/////////////////////////
////////////////////////////////////////////////////////

type allowedQueryTypes<T extends AttackFields> = T extends "sourceIP"
	? QueryTypes
	: Exclude<QueryTypes, "range">;
type QueryValue = string | [IpAddress, IpAddress] | string[];
const client = new Client({ node: process.env.ELASTIC_URL });

////////////////////////////////// Count FUNCTION //////////////////////////////////

export const count = async (
	index: esIndexes,
	field?: AttackFields,
	filterValue?: string
): Promise<CountResponse> => {
	const requestBody: CountRequest = {
		index: index,
	};
	if (field && filterValue) {
		requestBody["query"]["match"][field] = filterValue;
	}
	return await client.count(requestBody);
};

////////////////////////////////// QUERY FUNCTION //////////////////////////////////
export async function query<T extends AttackFields>(
	field: "sourceIP",
	type: "range",
	value: [IpAddress, IpAddress]
): Promise<SearchResponse>;

export async function query<T extends AttackFields>(
	field: T,
	type: "match",
	value: string
): Promise<SearchResponse>;
export async function query<T extends AttackFields>(
	field: T,
	type: "bool",
	value: string[]
): Promise<SearchResponse>;

export async function query<T extends AttackFields>(
	field: T,
	type: Extract<keyof QueryDslQueryContainer, QueryTypes>,
	value: QueryValue
): Promise<SearchResponse> {
	const query: QueryDslQueryContainer = createQuery(type, field, value);
	const queryBody: SearchRequest = {
		index: "attack-alerts",
		query,
	};

	return await getIndexData(queryBody);
}

const createQuery = (
	type: QueryTypes,
	field: AttackFields,
	value: QueryValue
): QueryDslQueryContainer => {
	let query: QueryDslQueryContainer;
	// console.log("here", type, field, value);

	if (type === "bool" && Array.isArray(value)) {
		// console.log(1);
		query = createFilterRequest(field, value);
	} else if (type === "match" && typeof value === "string") {
		// console.log(2);
		query = createMatchRequest(field, value);
	} else if (
		type === "range" &&
		typeof value !== "string" &&
		isIpRange(value)
	) {
		// console.log(3);
		query = createRangeRequest(field, value);
	}
	console.log("there", query);

	return query;
};

const createRangeRequest = (
	field: AttackFields,
	value: [IpAddress, IpAddress]
): QueryDslQueryContainer => {
	const query: QueryDslQueryContainer = {
		range: {},
	};

	query["range"][field] = {
		gte: value[0],
		lte: value[1],
	};
	// console.log("HERE IS THE QUERY", query);

	return query;
};
const createFilterRequest = (
	field: AttackFields,
	values: string[]
): QueryDslQueryContainer => {
	const filter = {};
	filter[`${field}.keyword`] = values;
	const query: QueryDslQueryContainer = {
		bool: {
			must_not: [{ terms: filter }],
		},
	};
	return query;
};

const createMatchRequest = (
	field: AttackFields,
	value: string
): QueryDslQueryContainer => {
	const query: QueryDslQueryContainer = {
		match: {},
	};
	query["match"][field] = value;
	return query;
};

const getIndexData = async (
	requestConfig: SearchRequest
): Promise<SearchResponse> => {
	return await client.search(requestConfig);
};
