"use client";
import { useEffect, useRef, useState } from "react";
import AttackCard from "../Cards/AttackCard";
let i = 0;
const Dashboard = () => {
	const [attacks, setAttacks] = useState<{ id: number }[]>([]);
	const [pauseModifications, setPauseModifications] = useState(false);
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		console.log("a3a3a3", pauseModifications);
		if (pauseModifications) return;

		const timeout = setTimeout(() => {
			setPauseModifications;
			handleRemove();
		}, 3500);

		return () => clearTimeout(timeout);
	}, [attacks]);

	const handleAdd = (): false | true => {
		if (pauseModifications) {
			return false;
		}
		if (attacks.length > 5) {
			handleRemove((newArr) => {
				setAttacks([{ id: i }, ...newArr]);
				i = i + 1;
			});
		} else {
			setAttacks([{ id: i }, ...attacks]);
			i = i + 1;
		}
		return true;
	};
	const handleRemove = (cb?: (arr: { id: number }[]) => void): void => {
		if (pauseModifications) return;
		setPauseModifications(true);
		if (attacks.length > 0) {
			const cards = listRef.current?.children;
			if (!cards) return;
			const card = cards[cards?.length - 1];
			card.classList.remove("show");
			setTimeout(() => {
				const newArr = [...attacks];
				newArr.pop();
				setAttacks(newArr);
				setPauseModifications(false);
				if (cb) {
					cb(newArr);
				}
			}, 600);
		}
	};

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
