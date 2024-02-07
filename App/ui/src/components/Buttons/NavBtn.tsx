import Link from "next/link";
interface Props {
	ref: href;
	text: string;
}
const NavBtn = ({ ref, text }: Props) => {
	return (
		<>
			<Link href={ref}>{text}</Link>
		</>
	);
};

export default NavBtn;
