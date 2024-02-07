import React, { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
	label: string;
	link: string;
}
const FooterButton = ({ children, link, label }: Props) => {
	return (
		<a
			href={link}
			role="link"
			aria-label={label}
			target="_blank"
			className="btn__social"
		>
			{children}
		</a>
	);
};

export default FooterButton;
