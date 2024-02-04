import { Client } from "@elastic/elasticsearch";
import {
	AggregationsAggregate,
	CountRequest,
	CountResponse,
	QueryDslQueryContainer,
	SearchRequest,
	SearchResponseBody,
} from "@elastic/elasticsearch/lib/api/types";
import "dotenv/config";

////////////////////////////////////////////////////////
//////////////////////////Types/////////////////////////
////////////////////////////////////////////////////////

type OneToThreeDigits =
	| `${number}`
	| `${number}${number}`
	| `${number}${number}${number}`;

type IpAddress =
	`${OneToThreeDigits}.${OneToThreeDigits}.${OneToThreeDigits}.${OneToThreeDigits}`;

type QueryTypes = "range" | "match" | "bool";

type AttackFields =
	| "mainCategory"
	| "subCategory"
	| "protocol"
	| "sourcePort"
	| "destinationPort"
	| "name"
	| "id"
	| "sourceIP"
	| "severity"
	| "authorizedIp";

type allowedQueryTypes<T extends AttackFields> = T extends Extract<
	AttackFields,
	"sourceIP"
>
	? QueryTypes
	: Exclude<QueryTypes, "range">;

const client = new Client({ node: process.env.ELASTIC_URL });

export const count = async (
	field?: AttackFields,
	filterValue?: string
): Promise<CountResponse> => {
	const requestBody: CountRequest = {
		index: "attack-alerts",
	};
	if (field && filterValue) {
		requestBody["query"]["match"][field] = filterValue;
	}
	return await client.count(requestBody);
};

export async function query<T extends AttackFields>(
	field: "sourceIP",
	type: Extract<keyof QueryDslQueryContainer, "range">,
	value: [IpAddress, IpAddress]
): Promise<SearchResponseBody<unknown, Record<string, AggregationsAggregate>>>;

export async function query<T extends AttackFields>(
	field: T,
	type: Exclude<QueryTypes, "range">,
	value: string
): Promise<SearchResponseBody<unknown, Record<string, AggregationsAggregate>>>;

export async function query<T extends AttackFields>(
	field: T,
	type: Extract<keyof QueryDslQueryContainer, QueryTypes>,
	value: string | [IpAddress, IpAddress]
): Promise<SearchResponseBody<unknown, Record<string, AggregationsAggregate>>> {
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
	value: string | [IpAddress, IpAddress]
): QueryDslQueryContainer => {
	const query: QueryDslQueryContainer = {};
	if (typeof value === "string") {
		if (type === "bool") {
			createFilterRequest(query, field, value);
		} else if (type === "match") {
			createMatchRequest(query, field, value);
		}
	} else if (typeof value !== "string") {
		createRangeRequest(query, field, value);
	}
	return query;
};

const createRangeRequest = (
	query: QueryDslQueryContainer,
	field: AttackFields,
	value: [IpAddress, IpAddress]
): QueryDslQueryContainer => {
	query["range"][field] = {
		lte: value[0],
		gte: value[1],
	};
	return query;
};
const createFilterRequest = (
	query: QueryDslQueryContainer,
	field: AttackFields,
	value: string
): QueryDslQueryContainer => {
	const filter = {};
	filter[field] = value;
	query["bool"]["filter"] = [filter];
	return query;
};
const createMatchRequest = (
	query: QueryDslQueryContainer,
	field: AttackFields,
	value: string
): QueryDslQueryContainer => {
	query["match"][field] = value;
	return query;
};

const getIndexData = async (
	requestConfig: SearchRequest
): Promise<
	SearchResponseBody<unknown, Record<string, AggregationsAggregate>>
> => {
	return await client.search(requestConfig);
};
