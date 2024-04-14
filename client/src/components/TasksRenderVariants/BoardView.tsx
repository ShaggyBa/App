import { ITask } from "types/task.types"
import { TaskCard } from "components/Task/TaskCard"

export const BoardView = ({ tasks }: { tasks: ITask[] }) => {
	return <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
		{
			tasks.map((task, index: number) => {
				return <TaskCard task={task} key={index} />
			})
		}
	</div>
}