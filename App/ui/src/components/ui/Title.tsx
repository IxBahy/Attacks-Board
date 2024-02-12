import React from "react";

const Title = ({ text }: { text: string }) => {
	return (
		<h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800  via-blue-600 to-blue-400 bg-clip-text text-transparent">
			{text}
		</h2>
	);
};

export default Title;
