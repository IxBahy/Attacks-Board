type href = `#${string}` | `/${string}`;

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
type esIndexes = "attack-log" | "attack-alerts";
type QueryTypes = "range" | "match" | "bool";
