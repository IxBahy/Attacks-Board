"use client";
import { useEffect, useRef, useState } from "react";
import AttackCard from "../Cards/AttackCard";
const Dashboard = () => {
	const [attacks, setAttacks] = useState<{}[]>([]);
	const listRef = useRef<HTMLUListElement>(null);
	const handleAdd = (): void => {
		if (attacks.length >= 5) return;
		setAttacks([{}, ...attacks]);
	};
	const handleRemove = (): void => {
		if (attacks.length > 0) {
			const cards = listRef.current?.children;
			if (!cards) return;
			const card = cards[cards?.length - 1];
			card.classList.remove("show");
			setTimeout(() => {
				const newArr = [...attacks];
				newArr.pop();
				setAttacks(newArr);
			}, 600);
		}
	};

	useEffect(() => {
		console.log("a3a3a3");

		const timeout = setTimeout(() => {
			handleRemove();
			console.log("inner");
		}, 2500);

		return () => clearTimeout(timeout);
	}, [attacks]);
	return (
		<section
			id="Dashboard"
			className="flex flex-col items-center min-h-screen w-full "
		>
			<h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800  via-blue-600 to-blue-400 bg-clip-text text-transparent">
				Dashboard
			</h2>
			<button onClick={handleAdd}>add</button>
			<ul className="w-full attack-list" ref={listRef}>
				{attacks.map((attack, index) => {
					return (
						<li className="attack-list__item show">
							<AttackCard attack={attack} key={index} />
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default Dashboard;
