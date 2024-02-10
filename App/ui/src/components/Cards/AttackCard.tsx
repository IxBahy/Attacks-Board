"use client";
"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RefObject, useEffect, useRef } from "react";
interface Props {
	attack: { id: number };
}
const AttackCard = ({ attack }: Props) => {
	// const color= attacks.severity === "high"? "darkred":  attacks.severity === "medium" ? "yellow" : "greem"
	const cardRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		setTimeout(() => {
			cardRef.current?.classList.add("show");
		}, 15);
	}, []);
	return (
		<>
			<Card
				ref={cardRef}
				className="attack-card  absolute top-0 left-0 duration-500 ease-out h-32 w-full bg-slate-900 text-gray-100 border-none shadow-[7px_7px_0px_0px_darkred]"
			>
				<CardHeader>
					<CardTitle>Card Title {attack.id}</CardTitle>
					<CardDescription>Card Description</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
				</CardContent>
			</Card>
		</>
	);
};

export default AttackCard;
