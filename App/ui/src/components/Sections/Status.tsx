import React, { useState } from "react";
import Title from "../ui/Title";
import dynamic from "next/dynamic";
import Loader from "../ui/Loader";
import { indexCount } from "@/apis/apis";

const Status = () => {
	const alertsCount = indexCount("attack-alerts");
	const totalCount = indexCount("attack-log");
	const ChartComponent = dynamic(() => import("../ui/StatusChart"), {
		loading: () => <Loader />,
		
	});
	return (
		<section
			id="Status"
			className="flex flex-col items-center w-full min-h-screen pt-16"
		>
			<Title text="Status" />
			<ChartComponent failed={totalCount} sucsesful={alertsCount} />
		</section>
	);
};

export default Status;
