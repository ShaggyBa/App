import { ITask } from "types/task.types"
import { TaskCard } from "components/Task/TaskCard"
import { AddSubTask } from "../Task/AddSubTask";
import { useState } from "react";


type Props = {
	tasks: ITask[],
	selectedTask: ITask | undefined,
	setOpenEdit: any,
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | undefined>>,
	setOpenDialog: any,
	duplicateHandler: () => void,
}

export const BoardView = ({ tasks, selectedTask, setOpenEdit, setSelectedTask, duplicateHandler, setOpenDialog }: Props) => {

	const [openSubTask, setOpenSubTask] = useState(false);

	const openDeleteDialog = () => {
		setOpenDialog(true)
	}


	return <>
		<div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
			{
				tasks.map((task, index: number) => {
					return <TaskCard
						key={index}
						task={task}
						setOpenEdit={setOpenEdit}
						setOpenSubTask={setOpenSubTask}
						setSelectedTask={setSelectedTask}
						openDeleteDialog={openDeleteDialog}
						duplicateHandler={duplicateHandler} />
				})
			}
		</div>

		<AddSubTask open={openSubTask} setOpen={setOpenSubTask} id={selectedTask?._id} />

	</>
}