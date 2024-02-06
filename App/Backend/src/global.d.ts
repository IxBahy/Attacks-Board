type JSONPrimitive = string | number | boolean | null;
type JSONObject = { [k: string]: JSONValue };
type JSONArray = JSONValue[];
type JSONValue = JSONArray | JSONObject | JSONPrimitive;

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

type OneToThreeDigits =
	| `${number}`
	| `${number}${number}`
	| `${number}${number}${number}`;

type IpAddress =
	`${OneToThreeDigits}.${OneToThreeDigits}.${OneToThreeDigits}.${OneToThreeDigits}`;

type filterValue = { [k in AttackFields]?: string };
