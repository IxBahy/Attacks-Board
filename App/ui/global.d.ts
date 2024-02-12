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
type OneToThreeDigits =
	| `${number}`
	| `${number}${number}`
	| `${number}${number}${number}`;

type IpAddress =
	`${OneToThreeDigits}.${OneToThreeDigits}.${OneToThreeDigits}.${OneToThreeDigits}`;

type filterValue = { [k in AttackFields]?: string };
