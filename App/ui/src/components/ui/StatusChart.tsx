"use client";
import { use } from "react";
import { Chart, ChartWrapperOptions } from "react-google-charts";
interface ChartProps {
	sucsesful: Promise<number>;
	failed: Promise<number>;
}

const StatusChart = ({ sucsesful, failed }: ChartProps) => {
	const failedCount = use(failed);
	const sucsesfulCount = use(sucsesful);
	const options: ChartWrapperOptions["options"] = {
		pieHole: 0.2,
		is3D: true,
		height: 265,
		backgroundColor: "transparent",
		colors: ["#2563eb", "darkred"],
		title: "Ratio of Sucsesful for Failed attacks",
		legend: "none",
	};
	const data = [
		["Failed Attacks", "Sucsesful"],
		["Failed Attacks", failedCount],
		["Sucsesful", sucsesfulCount],
	];
	return (
		<>
			<Chart
				className=" !fill-gray-100 "
				chartType={"PieChart"}
				options={options}
				data={data}
			/>
		</>
	);
};

export default StatusChart;
