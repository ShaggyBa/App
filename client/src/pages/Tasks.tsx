import Button from "components/Button"
import { Loader } from "components/Loader"
import { Tabs } from "components/Tabs"
import { Title } from "components/Title"
import { useEffect, useState } from "react"
import { FaList } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import { MdGridView } from "react-icons/md"
import { useParams } from "react-router-dom"
import { TaskTitle } from "components/Task/TaskTitle"
import { BoardView } from "components/TasksRenderVariants/BoardView/BoardView"
import { ListView } from "components/TasksRenderVariants/ListView/ListView"
import { AddTask } from "components/Task/AddTask"
import { useDuplicateTaskMutation, useGetAllTasksQuery, useTrashTaskMutation } from "state/api/tasks"
import { ITask } from "types/task.types"
import { toast } from "sonner"
import { ConfirmationWindow } from "components/TaskSettings/ConfirmationWindow"
import { useDispatch } from "react-redux"
import { getTasks } from "state/features/taskSlice"
import { useTranslation } from "react-i18next"

type TTabs = {
	title: string,
	icon: JSX.Element
}

type TTask_Type = {
	[key: string]: string
}


const TaskType: TTask_Type = {
	todo: "bg-red-600",
	"in progress": "bg-yellow-600",
	completed: "bg-green-600",
}

const Tasks = () => {

	const params = useParams()

	const dispatch = useDispatch()

	const [selectedView, setSelectedView] = useState(0)

	const [selectedTask, setSelectedTask] = useState<ITask | undefined>({} as ITask)

	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [open, setOpen] = useState(false)

	const status = params?.status || ""

	const { data, isLoading } = useGetAllTasksQuery({ strQuery: status, isTrashed: "", search: "" })

	const { t } = useTranslation()

	const [trashTask] = useTrashTaskMutation()
	const [duplicateTask] = useDuplicateTaskMutation()


	const duplicateHandler = async () => {
		try {
			const res = await duplicateTask(selectedTask?._id)
			toast.success("Task duplicated " + res)

			setTimeout(() => {
				setOpenDialog(false)
				window.location.reload()
			}, 500)
		}
		catch (err) {
			toast.error(t("SomethingWentWrong") + err)
		}
	}

	const trashTaskHandler = async () => {
		try {
			const res = await trashTask(selectedTask?._id).unwrap()

			toast.success("Task moved to trash " + res?.message)

			setTimeout(() => {
				setOpenDialog(false)
				window.location.reload()
			}, 500)
		}
		catch (err) {
			toast.error(t("SomethingWentWrong") + err)
		}
	}

	useEffect(() => {
		if (data) {
			dispatch(getTasks(data.tasks))
		}
	}, [data])


	const currentTaskStatus = (status: string) => {
		switch (status) {
			case "todo":
				return t("ToDosTasks")
			case "in progress":
				return t("InProgressTasks")
			case "completed":
				return t("CompletedTasks")
			default:
				return t("Tasks")
		}
	}

	const TabsData: TTabs[] = [
		{ title: t("BoardView"), icon: <MdGridView /> },
		{ title: t("ListView"), icon: <FaList /> }
	]

	return isLoading
		? <div className="py-10"><Loader /></div>
		: <div className="w-full h-full">
			<div className="flex items-center justify-between mb-4">
				<Title title={currentTaskStatus(status)} />

				{
					!status
					&& <Button
						onClick={() => {
							setSelectedTask(undefined)
							setOpen(true)
						}}
						label={t("CreateTask")}
						icon={<IoMdAdd className="text-lg" />}
						className={"flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md py-2 2xl:py-2.5"}

					/>
				}
			</div>

			<div>
				{!status ?
					<Tabs
						tabs={TabsData}
						selectedView={selectedView}
						setSelected={setSelectedView}
					>
						{
							selectedView === 0 ? <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
								<TaskTitle
									label={t("Todo")}
									className={TaskType.todo}
								/>
								<TaskTitle
									label={t("InProgress")}
									className={TaskType["in progress"]}
								/>
								<TaskTitle
									label={t("Completed")}
									className={TaskType.completed}
								/>
							</div>
								: <></>
						}


						{
							selectedView !== 1 && !status
								? <BoardView
									selectedTask={selectedTask}
									setOpenEdit={setOpen}
									setSelectedTask={setSelectedTask}
									duplicateHandler={duplicateHandler}
									setOpenDialog={setOpenDialog}
								/>
								: <ListView
									setOpenEdit={setOpen}
									setSelectedTask={setSelectedTask}
									setOpenDialog={setOpenDialog}
								/>
						}
					</Tabs>
					: <ListView setOpenEdit={setOpen} setSelectedTask={setSelectedTask} setOpenDialog={setOpenDialog} />
				}

			</div>

			<AddTask
				open={open}
				setOpen={setOpen}
				task={selectedTask}
			/>

			<ConfirmationWindow
				open={openDialog}
				setOpen={setOpenDialog}
				onClick={trashTaskHandler}
			/>
		</div>
}

export default Tasks

