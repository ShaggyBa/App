import { ITask, TStageEnum } from "types/task.types"
import { AddSubTask } from "../../Task/AddSubTask";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { BoardColumn } from "./BoardColumn";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Loader } from "components/Loader";
import { useSelector } from "react-redux";
import { getTasksSelector } from "state/selectors/tasks";


type Props = {
	selectedTask: ITask | undefined,
	setOpenEdit: any,
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | undefined>>,
	setOpenDialog: any,
	duplicateHandler: () => void,
}

export const BoardView = ({ selectedTask, setOpenEdit, setSelectedTask, duplicateHandler, setOpenDialog }: Props) => {

	const dataTasks = useSelector(getTasksSelector)

	const [openSubTask, setOpenSubTask] = useState(false);
	const [tasks, setTasks] = useState<ITask[]>(dataTasks)

	const openDeleteDialog = () => {
		setOpenDialog(true)
	}

	const taskStageFilter = (tasks: ITask[], stage: TStageEnum) => {
		return tasks.filter(task => task?.stage === stage)
	}


	useEffect(() => {
		setTasks(dataTasks)
	}, [dataTasks])

	return (dataTasks
		? <DndProvider backend={HTML5Backend}>
			<div className="w-full h-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
				<BoardColumn
					columnId={TStageEnum.TODO}
					setSelectedTask={setSelectedTask}
					setOpenSubTask={setOpenSubTask}
					setOpenEdit={setOpenEdit}
					openDeleteDialog={openDeleteDialog}
					duplicateHandler={duplicateHandler}
					tasks={taskStageFilter(tasks, TStageEnum.TODO)}
				/>
				<BoardColumn
					columnId={TStageEnum.IN_PROGRESS}
					setSelectedTask={setSelectedTask}
					setOpenSubTask={setOpenSubTask}
					setOpenEdit={setOpenEdit}
					openDeleteDialog={openDeleteDialog}
					duplicateHandler={duplicateHandler}
					tasks={taskStageFilter(tasks, TStageEnum.IN_PROGRESS)}
				/>
				<BoardColumn
					columnId={TStageEnum.COMPLETED}
					setSelectedTask={setSelectedTask}
					setOpenSubTask={setOpenSubTask}
					setOpenEdit={setOpenEdit}
					openDeleteDialog={openDeleteDialog}
					duplicateHandler={duplicateHandler}
					tasks={taskStageFilter(tasks, TStageEnum.COMPLETED)}
				/>
			</div>

			<AddSubTask open={openSubTask} setOpen={setOpenSubTask} id={selectedTask?._id} />

		</DndProvider>
		: <Loader />
	)
}