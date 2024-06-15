import { TaskCard } from "components/Task/TaskCard";
import { useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useUpdateTaskMutation } from "state/api/tasks";
import { updateTask } from "state/features/taskSlice";
import { TQueryResult } from "types/app.interface";
import { ITask } from "types/task.types";

type Props = {
	columnId: string,
	setOpenSubTask: any,
	openDeleteDialog: any,
	setOpenEdit: any,
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | undefined>>,
	duplicateHandler: () => void,
	tasks: ITask[]
}

export const BoardColumn = ({ columnId, openDeleteDialog, setOpenSubTask, setOpenEdit, setSelectedTask, duplicateHandler, tasks }: Props) => {

	const [updateTaskQuery] = useUpdateTaskMutation()

	const { t } = useTranslation()

	const dispatch = useDispatch()
	//@ts-ignore
	const [collectedProps, drop] = useDrop({
		accept: 'TASK', // Accept tasks of type 'TASK'
		drop: async (item: { task: ITask }, monitor) => {
			console.log(monitor)

			if (item.task.stage === columnId) return

			try {
				const newData = {
					...item.task,
					stage: columnId
				}

				await updateTaskQuery({ newData, id: item.task?._id }).unwrap().then((res: TQueryResult) => {
					dispatch(updateTask({ ...newData, _id: item.task?._id }))
					toast.success(res.message)
				})

			}
			catch (err) {
				toast.error(t("SomethingWentWrong") + err)
			}
		},
	});

	return (
		<div ref={drop} className="h-full min-h-screen flex flex-col gap-y-2">
			{tasks.map((task, index) => (
				<TaskCard
					key={index}
					task={task}
					setOpenEdit={setOpenEdit}
					setOpenSubTask={setOpenSubTask}
					setSelectedTask={setSelectedTask}
					openDeleteDialog={openDeleteDialog}
					duplicateHandler={duplicateHandler}
				/>
			))}
		</div>
	);
}