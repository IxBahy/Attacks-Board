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
		value: z.union([z.string(), z.array(z.string().ip()).max(2)]),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	console.log(form.getValues().field);
	type valueField = ControllerRenderProps<z.infer<typeof formSchema>, "value">;
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
		[k in QueryTypes]: (field: valueField) => React.JSX.Element;
	} = {
		bool: (field: valueField) => <>bool</>,
		match: (field: valueField) => <>match</>,
		range: (field: valueField) => <>range</>,
	};
	const valueComponent = valueFormComponents[form.watch().type];

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
									console.log(e);
								})();
							}}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="field"
								render={({ field }) => (
									<FormItem>
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
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
													{queryTypes.map(([value, name]) => {
														return (
															<SelectItem value={value}>{name}</SelectItem>
														);
													})}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormDescription>
											The type of Query you want to perform
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="value"
								render={({ field }) => {
									if (valueComponent) {
										return valueComponent(field);
									}
									return <></>;
								}}
							/>
							<Button type="submit">Submit</Button>
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
