export const TableHeader = () => {

	return <thead className="border-b border-gray-300">
		<tr className="text-black text-left">
			<th className="py-2">Name</th>
			<th className="py-2">Priority</th>
			<th className="py-2">Participants</th>
			<th className="py-2 hidden md:block">Created at</th>
		</tr>
	</thead>
}