import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LayoutRightSide from "@/components/Layout/LayoutLeftSide";
import Sidenav from "@/components/Layout/SideNav";
import Footer from "@/components/Layout/Footer";
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
				<LayoutRightSide />
				{children}
				<Sidenav />
				<Footer />
			</body>
		</html>
	);
}
