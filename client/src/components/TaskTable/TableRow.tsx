import clsx from "clsx"
import { ITask } from "types/task.types"
import { BGS, PRIORITY_STYLES, TASK_TYPE } from "utils/index"

import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md"
import { UserInfo } from "components/UserInfo"
import moment from "moment"
type TIcons = {
	[key: string]: JSX.Element
}

const ICONS: TIcons = {
	high: <MdKeyboardDoubleArrowUp />,
	medium: <MdKeyboardArrowUp />,
	lower: <MdKeyboardArrowDown />
}


export const TableRow = ({ task }: { task: ITask }) => {
	return <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
		<td className="py-2">
			<div className="flex items-center gap-2">
				<div className={clsx("w-4 h-4 rounded-full shrink-0", TASK_TYPE[task.stage])} />

				<p className="text-base text-black">{task.title}</p>
			</div>
		</td>

		<td className="py-2">
			<div className="flex gap-1 items-center">
				<span className={clsx("text-lg", PRIORITY_STYLES[task.priority])}>
					{ICONS[task.priority]}
				</span>
				<span className="capitalize">{task.priority}</span>
			</div>
		</td>

		<td className="py-2">
			<div className="flex gap-0.5">
				{task.team.map((member, index) => {
					return <div
						key={index}
						className={clsx("w-4 h-4 rounded-full text-white flex items-center justify-center text-sm", BGS[index % BGS.length])}
					>
						<UserInfo user={member} bgColor={BGS[index % BGS.length]} />
					</div>
				})}
			</div>
		</td>

		<td className="py-2 hidden md:block">
			<span className="text-base text-gray-600">
				{moment(task?.createdAt).fromNow()}
			</span>
		</td>
	</tr>
}