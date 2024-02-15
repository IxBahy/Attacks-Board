import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface Props {
	attackEvent: AttackEvent;
}
const QueryCard = ({ attackEvent }: Props) => {
	const color = {
		Low: "shadow-[2px_4px_0px_0px_green]",
		Medium: "shadow-[2px_4px_0px_0px_yellow]",
		High: "shadow-[2px_4px_0px_0px_darkred]",
	}[attackEvent.severity ?? "Low"];

	return (
		<>
			<Card
				className={`h-36 w-full bg-slate-900 text-gray-100 border-none ${color}`}
			>
				<CardHeader>
					<CardTitle className="truncate"> {attackEvent.name}</CardTitle>
					<CardContent className="text-sm text-muted/70">
						<ul className="flex flex-col flex-wrap h-24 ">
							<li>Category:{attackEvent.mainCategory}</li>
							<li className="w-1/2 truncate">
								Sub Category:{attackEvent.subCategory}
							</li>
							<li>Protocol: {attackEvent.protocol}</li>
							<li>d-Port: {attackEvent.destinationPort}</li>
							<li>s-Port: {attackEvent.sourcePort}</li>
							<li>is Authorized: {attackEvent.authorizedIp}</li>
							<li>Severity: {attackEvent.severity}</li>
							<li>From: {attackEvent.sourceIP}</li>
						</ul>
					</CardContent>
				</CardHeader>
			</Card>
		</>
	);
};

export default QueryCard;
