import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SideNav from "@/components/Layout/Sidenav";
import LayoutRightSide from "@/components/Layout/LayoutRightSide";
export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Attack Board Project",
	description: "created by IxBahy",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased relative flex bg-gray-950 text-gray-100",
					fontSans.variable
				)}
			>
				<SideNav />
				{children}
				<LayoutRightSide />
			</body>
		</html>
	);
}
