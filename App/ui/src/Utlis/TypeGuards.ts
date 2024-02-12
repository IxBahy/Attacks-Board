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
