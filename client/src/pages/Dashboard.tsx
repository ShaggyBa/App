import {
	MdAdminPanelSettings
} from "react-icons/md"

import { LuClipboardEdit } from "react-icons/lu"
import { FaNewspaper } from "react-icons/fa"
import { FaArrowsToDot } from "react-icons/fa6"

import { Card } from "components/Card"

import { summary } from "data/data.ts"
import { Chart } from "components/Chart"
import { TaskTable } from "components/TaskTable/TaskTable"
import { UserTable } from "components/UserTable/UserTable"


const totals = summary.tasks;

type TStats = {
	_id: string
	label: string
	total: number
	icon: JSX.Element
	bg: string
}

const stats: TStats[] = [
	{
		_id: "1",
		label: "TOTAL TASK",
		total: summary?.totalTasks || 0,
		icon: <FaNewspaper />,
		bg: "bg-[#1d4ed8]",
	},
	{
		_id: "2",
		label: "COMPLETED TASK",
		total: totals["completed"] || 0,
		icon: <MdAdminPanelSettings />,
		bg: "bg-[#0f766e]",
	},
	{
		_id: "3",
		label: "TASK IN PROGRESS ",
		total: totals["in progress"] || 0,
		icon: <LuClipboardEdit />,
		bg: "bg-[#f59e0b]",
	},
	{
		_id: "4",
		label: "TODOS",
		total: totals["todo"],
		icon: <FaArrowsToDot />,
		bg: "bg-[#be185d]" || 0,
	},
];

const Dashboard = () => {


	return (
		<div className={"h-full py-4"}>
			<div className={"grid grid-cols-1 md:grid-cols-4 gap-5"}>
				{
					stats.map(({ icon, bg, label, total }, index) => {
						return <Card
							key={index}
							icon={icon}
							bg={bg}
							total={total}
							label={label}
						/>
					})
				}
			</div>
			<div className="w-full bg-white my-16 p-4 rounded shadow-sm">
				<h4 className="text-xl text-gray-600 font-semibold">Your chart</h4>
				<Chart />
			</div>

			<div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
				{/* left */}
				<TaskTable
					tasks={summary.last10Task}
				/>
				{/* right */}
				<UserTable users={summary.users} />


			</div>
		</div>
	)
}

export default Dashboard