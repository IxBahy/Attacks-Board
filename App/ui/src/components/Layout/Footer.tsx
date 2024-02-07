import FooterButton from "../Buttons/FooterButton";

const Footer = () => {
	return (
		<footer>
			<div className="btn__container" aria-label="social media links">
				<FooterButton
					label="'linkedin"
					link={"https://www.linkedin.com/in/ixbahy/"}
				>
					<svg
						fill="currentcolor"
						width="21px"
						height="21px"
						viewBox="2 2 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
					</svg>
				</FooterButton>
				<div className="spotlight"></div>
				<FooterButton link={"https://github.com/IxBahy"} label="github">
					<svg
						fill="currentcolor"
						width="20px"
						height="20px"
						viewBox="2 2 12 15"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M15.917 1.666V17.5h-5.15c-.424 0-.557-.238-.557-.455 0-.266.01-1.141.01-2.226a1.935 1.935 0 0 0-.552-1.502c1.808-.202 3.706-.887 3.706-4.005a3.134 3.134 0 0 0-.834-2.177 2.914 2.914 0 0 0-.081-2.147s-.68-.218-2.23.832a7.684 7.684 0 0 0-4.063 0c-1.55-1.05-2.23-.832-2.23-.832a2.918 2.918 0 0 0-.08 2.147 3.142 3.142 0 0 0-.835 2.177c0 3.11 1.894 3.806 3.696 4.011a1.737 1.737 0 0 0-.516 1.084 1.726 1.726 0 0 1-2.361-.674 1.706 1.706 0 0 0-1.243-.836s-.793-.01-.056.494a2.145 2.145 0 0 1 .9 1.187s.478 1.578 2.735 1.088c.004.676.01 1.186.01 1.38 0 .214-.147.454-.553.454H.083V1.666z"></path>
					</svg>
				</FooterButton>
			</div>
		</footer>
	);
};

export default Footer;
