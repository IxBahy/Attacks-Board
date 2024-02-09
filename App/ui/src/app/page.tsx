import Dashboard from "@/components/Sections/Dashboard";
import Search from "@/components/Sections/Search";
import Snapshots from "@/components/Sections/Snapshots";
import Status from "@/components/Sections/Status";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24  w-[60vw] ">
			<Dashboard />
			<Search />
			<Status />
			<Snapshots />
		</main>
	);
}
