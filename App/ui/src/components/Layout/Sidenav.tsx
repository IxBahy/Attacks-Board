import NavBtn from "../Buttons/NavBtn";

const Sidenav = () => {
	return (
		<>
			<nav className="sticky left-0 top-0  h-screen w-[20vw] flex flex-col justify-evenly items-center  ">
				<NavBtn
					href="#Dashboard"
					text="Dashboard"
					color="hover:shadow-[5px_5px_rgba(_255,_255,_0,_0.4),_10px_10px_rgba(_255,_255,_0,_0.3),_15px_15px_rgba(_255,_255,_0,_0.2),_20px_20px_rgba(_255,_255,_0,_0.1),_25px_25px_rgba(_255,_255,_0,_0.05)] "
				/>

				<NavBtn
					href="#Search"
					text="Search"
					color="hover:shadow-[5px_5px_rgba(_20,_160,_90,_0.2),_10px_10px_rgba(_20,_160,_90,_0.3),_15px_15px_rgba(_20,_160,_90,_0.2),_20px_20px_rgba(_20,_160,_90,_0.1),_25px_25px_rgba(_20,_160,_90,_0.05)] "
				/>

				<NavBtn
					href="#Status"
					text="Status"
					color="hover:shadow-[5px_5px_rgba(160,_32,_240,_0.4),_10px_10px_rgba(160,_32,_240,_0.3),_15px_15px_rgba(160,_32,_240,_0.2),_20px_20px_rgba(160,_32,_240,_0.1),_25px_25px_rgba(160,_32,_240,_0.05)] "
				/>

				<NavBtn
					href="#Snapshots"
					text="Snapshots"
					color="hover:shadow-[5px_5px_rgba(_255,_226,_226,_0.4),_10px_10px_rgba(_255,_226,_226,_0.3),_15px_15px_rgba(_255,_226,_226,_0.2),_20px_20px_rgba(_255,_226,_226,_0.1),_25px_25px_rgba(_255,_226,_226,_0.05)] "
				/>
			</nav>
		</>
	);
};

export default Sidenav;
