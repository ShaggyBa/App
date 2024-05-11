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
import { BoardView } from "components/TasksRenderVariants/BoardView"
import { ListView } from "components/TasksRenderVariants/ListView/ListView"
import { AddTask } from "components/Task/AddTask"
import { useDuplicateTaskMutation, useGetAllTasksQuery, useTrashTaskMutation } from "state/api/tasks"
import { ITask } from "types/task.types"
import { toast } from "sonner"
import { ConfirmationWindow } from "components/TaskSettings/ConfirmationWindow"

type TTabs = {
	title: string,
	icon: JSX.Element
}

type TTask_Type = {
	[key: string]: string
}

const TabsData: TTabs[] = [
	{ title: "Board View", icon: <MdGridView /> },
	{ title: "List View", icon: <FaList /> }
]


const TaskType: TTask_Type = {
	todo: "bg-red-600",
	"in progress": "bg-yellow-600",
	completed: "bg-green-600",
}

const Tasks = () => {

	const params = useParams()

	const [selectedView, setSelectedView] = useState({})

	const [selectedTask, setSelectedTask] = useState<ITask | undefined>({} as ITask)

	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [open, setOpen] = useState(false)

	const [tasks, setTasks] = useState<ITask[]>([])

	const status = params?.status || ""

	const { data, isLoading } = useGetAllTasksQuery({ strQuery: status, isTrashed: "", search: "" })

	const [trashTask] = useTrashTaskMutation()
	const [duplicateTask] = useDuplicateTaskMutation()

	const filterTasks = (status: string) => {
		if (status) {
			return tasks.filter(task => task?.stage === status)
		}
	}

	const currentTasks = status ? filterTasks(status) : tasks

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
			toast.error("Something went wrong: " + err)
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
			toast.error("Something went wrong: " + err)
		}
	}

	useEffect(() => {
		if (data) {
			setTasks(data.tasks)
		}
	}, [data])


	return isLoading
		? <div className="py-10"><Loader /></div>
		: <div className="w-full">
			<div className="flex items-center justify-between mb-4">
				<Title title={status ? `${status} tasks` : "Tasks"} />

				{
					!status
					&& <Button
						onClick={() => {
							setSelectedTask(undefined)
							setOpen(true)
						}}
						label="Create Task"
						icon={<IoMdAdd className="text-lg" />}
						className={"flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md py-2 2xl:py-2.5"}

					/>
				}
			</div>

			<div>
				<Tabs
					tabs={TabsData}
					setSelected={setSelectedView}
				>
					{
						!status ?
							<div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
								<TaskTitle
									label="To Do"
									className={TaskType.todo}
								/>
								<TaskTitle
									label="In progress"
									className={TaskType["in progress"]}
								/>
								<TaskTitle
									label="Completed"
									className={TaskType.completed}
								/>
							</div>

							: <div></div>
					}

					{
						selectedView !== 1
							? <BoardView
								tasks={currentTasks || tasks}
								selectedTask={selectedTask}
								setOpenEdit={setOpen}
								setSelectedTask={setSelectedTask}
								duplicateHandler={duplicateHandler}
								setOpenDialog={setOpenDialog}
							/>
							: <ListView
								tasks={currentTasks || tasks}
								setOpenEdit={setOpen}
								setSelectedTask={setSelectedTask}
								setOpenDialog={setOpenDialog}
							/>
					}
				</Tabs>


			</div>

			<AddTask
				open={open}
				setOpen={setOpen}
				task={selectedTask}
				key={new Date().getTime()}
			/>

			<ConfirmationWindow
				open={openDialog}
				setOpen={setOpenDialog}
				onClick={trashTaskHandler}
			/>
		</div>
}

export default Tasks

