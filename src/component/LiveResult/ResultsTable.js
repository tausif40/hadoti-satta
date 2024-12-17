import React from "react";

const results = [
	{
		name: "HADOTI DAY",
		number: "127-06-268",
		startTime: "11:45 AM",
		endTime: "12:45 PM",
		chartName: "Hadoti day Chart",
	},
	{
		name: "HADOTI NIGHT",
		number: "357-52-570",
		startTime: "07:45 PM",
		endTime: "",
		chartName: "Hadoti night Chart",
	},
	// {
	// 	name: "SRIDEVI",
	// 	number: "190-08-134",
	// 	startTime: "11:30 AM",
	// 	endTime: "12:30 PM",
	// 	chartName: "Sridevi Chart",
	// 	isHighlighted: true,
	// },
	// {
	// 	name: "MADHUR MORNING",
	// 	number: "890-77-368",
	// 	startTime: "11:40 AM",
	// 	endTime: "12:40 PM",
	// 	chartName: "Madhur Morning Chart"
	// },
	// {
	// 	name: "MADHURI DAY",
	// 	number: "300-33-300",
	// 	startTime: "01:30 PM",
	// 	endTime: "02:30 PM",
	// 	chartName: "Madhuri Day Chart"
	// },
	// {
	// 	name: "MAHARANI",
	// 	number: "400-42-246",
	// 	startTime: "12:15 PM",
	// 	endTime: "02:15 PM",
	// 	chartName: "Maharani Day Chart",
	// 	isHighlighted: true,
	// },
	// {
	// 	name: "MORNING MADHURI",
	// 	number: "239-40-280",
	// 	startTime: "11:15 PM",
	// 	endTime: "12:15 PM",
	// 	chartName: "Morning Madhuri Chart"
	// },
	// {
	// 	name: "SRK DAY",
	// 	number: "469-98-224",
	// 	startTime: "11:00 AM",
	// 	endTime: "12:00 PM",
	// 	chartName: "SRK Day Chart",
	// },
	// {
	// 	name: "DHAN DAY",
	// 	number: "159-54-220",
	// 	startTime: "11:15 AM",
	// 	endTime: "12:15 PM",
	// 	chartName: "Dhan Day Chart"
	// },
	// {
	// 	name: "ACHAL DAY",
	// 	number: "669-12-589",
	// 	startTime: "11:15 AM",
	// 	endTime: "12:15 PM",
	// 	chartName: "Achal Day Chart",
	// 	isHighlighted: true,
	// },
	// {
	// 	name: "KING MORNING",
	// 	number: "579-11-146",
	// 	startTime: "11:30 AM",
	// 	endTime: "12:30 PM",
	// 	chartName: "King Morning Chart"
	// },
	// {
	// 	name: "CHHENAI STAR",
	// 	number: "457-66-790",
	// 	startTime: "11:30 AM",
	// 	endTime: "12:30 PM",
	// 	chartName: "Chennai Star Chart"
	// },
];

const Badge = ({ children, variant = "default" }) => {
	const baseStyles =
		"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
	const variants = {
		default: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
		secondary: "border-transparent bg-gray-500 text-white hover:bg-gray-600",
		destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
		outline: "text-gray-700",
	};
	return <div className={`${baseStyles} ${variants[ variant ]}`}>{children}</div>;
};

const Card = ({ children, className = "" }) => {
	return (
		<div
			className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`}
		>
			{children}
		</div>
	);
};

const ResultsTable = () => {
	return (
		<>
			<div className="bg-red-50">
				<div className=" pb-6">
					<div className="bg-gradient-to-r from-[#ef233c] to-pink-500 py-4 mb-4">
						<h2 className="text-2xl font-semibold text-center text-white">Live Results</h2>
					</div>
					<div className="grid gap-4 container">
						{results.map((result) => (
							<Card
								key={result.name}
								className={
									result.isHighlighted
										? "overflow-hidden bg-yellow-100"
										: "overflow-hidden"
								}
							>
								<div className="p-4">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
										<div className="space-y-1">
											<h3 className="font-bold text-red-600">{result.name}</h3>
											{/* <p className="text-sm text-gray-500">{result.chartName}</p> */}
										</div>
										<div className="text-center">
											<span className="text-2xl font-bold tracking-wider">
												{result.number}
											</span>
										</div>
										<div className="flex items-center justify-end gap-4">
											<div className="text-sm text-right">
												<div>{result.startTime}</div>
												<div>{result.endTime}</div>
											</div>
											<Badge variant="secondary">Daily</Badge>
										</div>
									</div>
								</div>
								<div className="h-2 bg-green-600" />
							</Card>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ResultsTable;
