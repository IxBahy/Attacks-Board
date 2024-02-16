import { CountResponse, SearchResponse } from "elasticsearch";

export const searchQuery = async (
	payload: RequestPayload
): Promise<SearchResponse<AttackEvent>> => {
	const params = new URLSearchParams();
	params.append("field", payload.field);
	params.append("type", payload.type);
	if (Array.isArray(payload.value)) {
		payload.value.forEach((val: string) => params.append("value", val));
	} else {
		params.append("value", payload.value);
	}
	const result = await fetch(`http://localhost:5000/query?${params}`, {
		method: "GET",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json() as Promise<{
				data: SearchResponse<AttackEvent>;
			}>;
		})
		.then((data) => {
			return data.data;
		});
	return result;
};
export const indexCount = async (index: esIndexes): Promise<number> => {
	const params = new URLSearchParams();
	params.append("index", index);
	const result = await fetch(`http://localhost:5000/query/count?${params}`, {
		method: "GET",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json() as Promise<CountResponse>;
		})
		.then((data) => {
			console.log("data", data);

			return data.count;
		});

	return result;
};
