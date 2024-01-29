import fs from "fs";

export default JSON.parse(
	fs.readFileSync(`settings-${process.env.NODE_ENV}.json`, "utf-8") || "{}"
);
