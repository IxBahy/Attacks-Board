import Link from "next/link";
interface Props {
	href: href;
	text: string;
	color: string;
}
const NavBtn = ({ href, text, color }: Props) => {
	return (
		<>
			<Link
				className={`w-48 max-w-48 text-center py-4 rounded-xl border border-gray-600 duration-150  ${color}  `}
				href={href}
			>
				{text}
			</Link>
		</>
	);
};

export default NavBtn;
