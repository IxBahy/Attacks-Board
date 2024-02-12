"use client";
import { useEffect, useRef, useState } from "react";
import AttackCard from "../Cards/AttackCard";
import Title from "../ui/Title";
let i = 0;
const Dashboard = () => {
	const [attacks, setAttacks] = useState<{ id: number }[]>([]);
	const [pauseModifications, setPauseModifications] = useState(false);
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (pauseModifications) return;

		const timeout = setTimeout(() => {
			setPauseModifications;
			handleRemove();
		}, 2000);

		return () => clearTimeout(timeout);
	}, [attacks]);

	const handleAdd = (): false | true => {
		console.log("test", pauseModifications);

		if (pauseModifications) {
			return false;
		}
		if (attacks.length >= 5) {
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
		if (attacks.length > 0) {
			setPauseModifications(true);
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
			className="flex flex-col items-center min-h-[150vh] w-full "
		>
			<Title text="Dashboard" />
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
