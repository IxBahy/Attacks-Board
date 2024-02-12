import Title from "../ui/Title";

const LayoutLeftSide = () => {
	return (
		<>
			<article className="sticky left-0 top-0 h-screen w-[20vw] flex flex-col items-center justify-center  ">
				<Title text="Attack Board" />

				<div className="ps-8 pt-8 font-mono h-4/5">
					<p>
						This is a dashboard that shows all the attacks that were assigned as
						alerts and preprocessed in flink into a kafka topic. <br />
						in real time we can see the attacks that happened and we can also
						get some statistics about the current state of the system while also
						being able to save snapshots of the status we got. <br />
						you can also search for the log of some attacks based on the fields
						or even get the ratio of faild to successfull attacks.
					</p>
				</div>
			</article>
		</>
	);
};

export default LayoutLeftSide;
