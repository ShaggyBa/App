import { ITask } from "types/task.types";
import { ListHead } from "./ListHeader";
import { ListRow } from "./ListRow";
import { useSelector } from "react-redux";
import { getTasksSelector } from "state/selectors/tasks";

type Props = {
	setOpenEdit: any,
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | undefined>>,
	setOpenDialog: any,
}

export const ListView = ({ setOpenEdit, setSelectedTask, setOpenDialog }: Props) => {

	const tasks = useSelector(getTasksSelector)

	return <>
		<div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
			<div className="overflow-x-auto">
				<table className="w-full">
					<ListHead />
					<tbody>
						{tasks.map((task, index: number) => (
							<ListRow
								setSelectedTask={setSelectedTask}
								setOpenEdit={setOpenEdit}
								setOpenDialog={setOpenDialog}
								key={index}
								task={task}

							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	</>
}