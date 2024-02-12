import { ControllerRenderProps, useForm } from "react-hook-form";
import Title from "../ui/Title";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import React from "react";
import { isStrArray } from "@/Utlis/TypeGuards";
type FormObjectEvent = {
	field:
		| "mainCategory"
		| "subCategory"
		| "protocol"
		| "sourcePort"
		| "destinationPort"
		| "name"
		| "id"
		| "sourceIP"
		| "severity"
		| "authorizedIp";
	type: "match" | "bool" | "range";
	value: string | string[];
};
const Search = () => {
	const formSchema = z.object({
		field: z.enum([
			"mainCategory",
			"subCategory",
			"protocol",
			"sourcePort",
			"destinationPort",
			"name",
			"id",
			"sourceIP",
			"severity",
			"authorizedIp",
		]),
		type: z.enum(["match", "bool", "range"]),
		firstValue: z.union([z.string().ip(), z.string()]),
		secondValue: z.string().ip().optional(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const queryTypes: [QueryTypes, string][] =
		form.watch().field === "sourceIP"
			? [
					["range", "Range"],
					["bool", "Filter"],
					["match", "Match"],
			  ]
			: [
					["bool", "Filter"],
					["match", "Match"],
			  ];

	const valueFormComponents: {
		[k in QueryTypes]: () => React.JSX.Element;
	} = {
		bool: () => (
			<FormField
				control={form.control}
				name="firstValue"
				render={({ field }) => (
					<FormItem className="min-w-60">
						<FormLabel>Value</FormLabel>
						<FormControl>
							<Input placeholder="Value" {...field} value={field.value ?? ""} />
						</FormControl>
						<FormDescription>type the value You want to Filter</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
		),
		match: () => (
			<FormField
				control={form.control}
				name="firstValue"
				render={({ field }) => (
					<FormItem className="min-w-60">
						<FormLabel>Value</FormLabel>
						<FormControl>
							<Input placeholder="Value" {...field} value={field.value ?? ""} />
						</FormControl>
						<FormDescription>type the value You want to match</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
		),
		range: () => {
			return (
				<>
					<FormField
						control={form.control}
						name="firstValue"
						render={({ field }) => (
							<FormItem className="min-w-60 ">
								<FormLabel>First</FormLabel>
								<FormControl className="!my-4">
									<Input
										placeholder="IP"
										{...field}
										value={field.value ?? ""}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="secondValue"
						render={({ field }) => (
							<FormItem className="min-w-60 ">
								<FormLabel>Second</FormLabel>
								<FormControl className="!my-4">
									<Input
										placeholder="IP"
										{...field}
										value={field.value ?? ""}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</>
			);
		},
	};
	const valueComponent =
		valueFormComponents[form.watch().type] ||
		(() => <p>Select the Query type</p>);
	const isIPAddress = (val: string): boolean => {
		const { success } = z.string().ip().safeParse(val);
		return success;
	};

	const handleSubmit = (e: FormObjectEvent) => {
		if (form.formState.isValid) {
			console.log(e);
		}
	};

	return (
		<section
			id="Search"
			className="flex flex-col items-center w-full min-h-screen pt-16"
		>
			<Title text="Search" />
			<div className="flex items-center w-full min-h-[80vh]">
				<div className="flex  flex-col justify-center items-center w-1/2 h-full">
					<Form {...form}>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit((e) => {
									const payload: FormObjectEvent = {
										field: e.field,
										type: e.type,
									} as FormObjectEvent;
									if (e.type === "range") {
										if (
											e.firstValue &&
											e.secondValue &&
											isIPAddress(e.firstValue)
										) {
											payload.value = [e.firstValue, e.secondValue];
										} else {
											form.setError("firstValue", {
												type: "validate",
												message: "both values must be IP addresses",
											});
										}
									} else {
										payload.value = e.firstValue;
									}
									if (payload.value) {
										handleSubmit(payload);
									}
								})();
							}}
							className="space-y-8 flex flex-col items-center"
						>
							<FormField
								control={form.control}
								name="field"
								render={({ field }) => (
									<FormItem className="min-w-60">
										<FormLabel>field</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Select a field" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="mainCategory">
														Main Category
													</SelectItem>
													<SelectItem value="subCategory">
														Sub Category
													</SelectItem>
													<SelectItem value="protocol">Protocol</SelectItem>
													<SelectItem value="sourcePort">
														Source Port
													</SelectItem>
													<SelectItem value="destinationPort">
														Destination Port
													</SelectItem>
													<SelectItem value="name">Name</SelectItem>
													<SelectItem value="id">ID</SelectItem>
													<SelectItem value="sourceIP">Source IP</SelectItem>
													<SelectItem value="severity">Severity</SelectItem>
													<SelectItem value="authorizedIp">
														Authorized IP
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormDescription>
											from the fields in the attack object
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem className="my-4 min-w-60">
										<FormLabel>type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Select Query type" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{queryTypes.map(([value, name], index) => {
														return (
															<SelectItem key={index} value={value}>
																{name}
															</SelectItem>
														);
													})}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormDescription>
											The type of Query you want to perform
										</FormDescription>
									</FormItem>
								)}
							/>
							<div className="min-h-48 flex flex-col items-center min-w-60 text-center !mb-6">
								{valueComponent()}
							</div>
							<div className="w-60 flex justify-end ">
								<Button type="submit">Submit</Button>
							</div>
						</form>
					</Form>
				</div>
				<div className="flex border flex-col justify-center items-center w-1/2 h-full">
					HI
				</div>
			</div>
		</section>
	);
};

export default Search;
