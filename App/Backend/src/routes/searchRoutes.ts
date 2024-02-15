import { Request, Response, Router } from "express";
import { count, query } from "../libs/searchEngine";
import { body, validationResult } from "express-validator";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { handleInputError } from "../middlewares/handleErrors";

//////////////////////////////////////////////////////
////////////////// Type Guards ///////////////////////
//////////////////////////////////////////////////////

export const isIpRange = (input: unknown): input is [IpAddress, IpAddress] => {
	if (!isStrArray(input)) return false;
	return input[0].split(".").length === 4 && input[1].split(".").length === 4;
};
export const isStrArray = (input: unknown): input is string[] => {
	return (
		Array.isArray(input) && input.length > 0 && typeof input[0] === "string"
	);
};

//////////////////////////////////////////////////////
///////////////////// Routes /////////////////////////
//////////////////////////////////////////////////////

export const searchRouter = Router();
searchRouter.get(
	"/",
	// body("field").exists().isString(),
	// body("type").exists().isString(),
	// body("value").exists(),
	handleInputError,
	async (req: Request, res: Response) => {
		const queryField = req.query.field as AttackFields;
		const queryType = req.query.type as QueryTypes;
		const queryValue = req.query.value;

		// const queryField = req.body.field;
		// const queryType = req.body.type;
		// const queryValue = req.body.value;

		let response: SearchResponse;

		// to make sure that things will never break I check for the types first than I staticly declare the query type based on the input
		if (
			queryField === "sourceIP" &&
			queryType === "range" &&
			isIpRange(queryValue)
		) {
			console.log("First");
			response = await query("sourceIP", "range", queryValue);
		} else if (queryType === "match" && typeof queryValue === "string") {
			console.log("sec");
			response = await query(queryField, "match", queryValue);
			// } else if (queryType === "bool" && isStrArray(queryValue)) {
		} else if (queryType === "bool" && typeof queryValue === "string") {
			console.log("Third");
			response = await query(queryField, "bool", [queryValue]);
		} else {
			res.status(400);
			res.json({
				errors: "invalid input types",
			});
			return;
		}

		res.json({ data: response });
	}
);

searchRouter.get("/count", async (req: Request, res: Response) => {
	const index = req.query.index as esIndexes;
	if (!index) {
		res.status(400);
		res.send("index parameter is missing");
		return;
	}
	const queyIndex = async () => {
		const data = await count(index);
		const countValue = await data.count;
		return countValue;
	};
	const value = await queyIndex();
	res.json({ count: value });
});
