import {
	MdAdminPanelSettings
} from "react-icons/md"

import { LuClipboardEdit } from "react-icons/lu"
import { FaNewspaper } from "react-icons/fa"
import { FaArrowsToDot } from "react-icons/fa6"

import { Card } from "components/Card"

import { Chart } from "components/Chart"
import { TaskTable } from "components/TaskTable/TaskTable"
import { UserTable } from "components/UserTable/UserTable"
import { useEffect, useState } from "react"
import { useGetDashboardStatisticsQuery } from "state/api/tasks"
import { Loader } from "components/Loader"



type TStats = {
	_id: string
	label: string
	total: number
	icon: JSX.Element
	bg: string
	link?: string
}

const Dashboard = () => {

	const [totals, setTotals] = useState<any>({})

	const { data: fetchedData, isLoading, refetch } = useGetDashboardStatisticsQuery()


	const stats: TStats[] = totals ? [
		{
			_id: "1",
			label: "TOTAL TASK",
			total: totals?.totalTasks || 0,
			icon: <FaNewspaper />,
			bg: "bg-[#1d4ed8]",
			link: "/tasks"
		},
		{
			_id: "2",
			label: "COMPLETED TASK",
			total: totals?.tasks?.completed || 0,
			icon: <MdAdminPanelSettings />,
			bg: "bg-[#0f766e]",
			link: "/completed/completed"
		},
		{
			_id: "3",
			label: "TASK IN PROGRESS ",
			total: totals?.tasks?.["in progress"] || 0,
			icon: <LuClipboardEdit />,
			bg: "bg-[#f59e0b]",
			link: "/in-progress/in progress"
		},
		{
			_id: "4",
			label: "TODOS",
			total: totals?.tasks?.todo || 0,
			icon: <FaArrowsToDot />,
			bg: "bg-[#be185d]" || 0,
			link: "/todo/todo"
		},
	] : [];

	useEffect(() => {
		setTotals(fetchedData?.body || {})
		// console.log(fetchedData)
	}, [fetchedData])

	return (
		!isLoading ? <div className={"h-full py-4"}>
			<div className={"grid grid-cols-1 md:grid-cols-4 gap-5"}>
				{
					stats.map(({ icon, bg, label, total, link }, index) => {
						return <Card
							key={index}
							icon={icon}
							bg={bg}
							total={total}
							label={label}
							link={link}
						/>
					})
				}
			</div>
			<div className="w-full bg-white my-16 p-4 rounded shadow-sm">
				<h4 className="text-xl text-gray-600 font-semibold">Your chart</h4>
				<Chart data={totals?.graphData} />
			</div>

			<div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
				<TaskTable tasks={totals?.last10Task} />
				<UserTable users={totals?.users} />
			</div>
		</div>
			: <Loader />
	)
}

export default Dashboard