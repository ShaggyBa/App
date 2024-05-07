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
import { useGetAllTasksQuery } from "state/api/tasks"
import { ITask } from "types/task.types"

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

	const [selected, setSelected] = useState({})

	const [selectedTask, setSelectedTask] = useState<ITask>({} as ITask)


	const [open, setOpen] = useState(false)

	const [tasks, setTasks] = useState<ITask[]>([])

	const status = params?.status || ""

	const { data, isLoading, refetch } = useGetAllTasksQuery({ strQuery: status, isTrashed: "", search: "" })

	const filterTasks = (status: string) => {
		if (status) {
			return tasks.filter(task => task?.stage === status)
		}
	}

	const currentTasks = status ? filterTasks(status) : tasks

	useEffect(() => {
		if (data) {
			setTasks(data.tasks)
		}
	}, [data])

	const onAddTask = () => {
		refetch()
	}

	return isLoading
		? <div className="py-10"><Loader /></div>
		: <div className="w-full">
			<div className="flex items-center justify-between mb-4">
				<Title title={status ? `${status} tasks` : "Tasks"} />

				{
					!status
					&& <Button
						onClick={() => setOpen(true)}
						label="Create Task"
						icon={<IoMdAdd className="text-lg" />}
						className={"flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md py-2 2xl:py-2.5"}

					/>
				}
			</div>

			<div>
				<Tabs
					tabs={TabsData}
					setSelected={setSelected}
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
						selected !== 1
							? <BoardView tasks={currentTasks || tasks} setSelected={setSelectedTask} />
							: <ListView tasks={currentTasks || tasks} setSelected={setSelectedTask} />
					}
				</Tabs>

				<AddTask onSubmit={onAddTask} open={open} setOpen={setOpen} task={selectedTask || undefined} />
			</div>

		</div>
}

export default Tasks

