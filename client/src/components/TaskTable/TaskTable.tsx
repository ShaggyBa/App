import { TableHeader } from "components/TaskTable/TableHeader"
import { TableRow } from "components/TaskTable/TableRow"
import { ITask } from "types/task.types"

export const TaskTable = ({ tasks }: { tasks: ITask[] }) => {

	return <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
		<table className="w-full">
			<TableHeader />
			<tbody>
				{
					tasks.map((task, index: number) => {
						return <TableRow
							key={index}
							task={task}
						/>
					})
				}
			</tbody>
		</table>
	</div>
}