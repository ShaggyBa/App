import clsx from "clsx";
import { useState } from "react";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { ITask } from "types/task.types";
import { BGS, PRIORITY_STYLES, TASK_TYPE, formatDate } from "utils/index";
import { TaskSettingsBar } from "../TaskSettings/TaskSettingsBar";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { UserInfo } from "components/UserInfo";
import { IoMdAdd } from "react-icons/io";
import { AddSubTask } from "./AddSubTask";
import { useDrag } from "react-dnd";


const ICONS: { [key: string]: JSX.Element } = {
	high: <MdKeyboardDoubleArrowUp />,
	medium: <MdKeyboardArrowUp />,
	low: <MdKeyboardArrowDown />,
};


type Props = {
	task: ITask
	setSelectedTask?: any
	setOpenSubTask?: any
	setOpenEdit?: any
	openDeleteDialog?: any
	duplicateHandler?: any
}

export const TaskCard = ({ task, setSelectedTask, setOpenSubTask, setOpenEdit, openDeleteDialog, duplicateHandler }: Props) => {

	const { user } = useSelector((state: any) => state.auth)
	const [isOpen, setIsOpen] = useState(false)

	const [collected, drag, dragPreview] = useDrag({
		type: 'TASK', // Define a custom type for your task drag
		item: { task }, // Provide the task ID for identification
	});

	//@ts-ignore
	return collected.isDragging
		? <div ref={dragPreview} />
		: <div
			className={`w-full h-fit bg-white shadow-md p-4 rounded`}
			ref={drag}
			//@ts-ignore
			{...collected}
		>
			<div className="w-full flex justify-between">
				<div className={
					clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIORITY_STYLES[task?.priority])
				}
				>
					<span className="text-lg">{ICONS[task?.priority]}</span>
					<span className="uppercase">{task?.priority} Priority</span>
				</div>
				{user?.isAdmin && <TaskSettingsBar
					task={task}
					setSelectedTask={setSelectedTask}
					setOpenSubTask={setOpenSubTask}
					setOpenEdit={setOpenEdit}
					openDeleteDialog={openDeleteDialog}
					duplicateHandler={duplicateHandler}
				/>}
			</div>

			<>
				<div className="flex items-center gap-2">
					<div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task?.stage])} />
					<h4 className="line-clamp-1 text-black">{task?.title}</h4>
				</div>
				<span className="text-sm text-gray-600">
					{formatDate(new Date(task?.date))}
				</span>
			</>


			<div className="w-full border-t border-gray-200 my-2" />

			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-3">
					<div className="flex gap-1 items-center text-sm text-gray-600">
						<BiMessageAltDetail />
						<span>{task?.activities?.length}</span>
					</div>
					<div className="flex gap-1 items-center text-sm text-gray-600">
						<MdAttachFile />
						<span>{task?.assets?.length}</span>
					</div>
					<div className="flex gap-1 items-center text-sm text-gray-600">
						<FaList />
						<span>{task?.subTasks?.length}</span>
					</div>
				</div>

				<div className="flex flex-row-reverse gap-1.5">
					{task?.team?.map((member, index) => {

						return <div
							key={index}
							className={clsx("w-4 h-4 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}
						>
							<UserInfo user={member} bgColor={BGS[index % BGS.length]} />
						</div>
					})}

				</div>
			</div>

			{
				task?.subTasks?.length
					? task.subTasks.map((subtask, index) => {
						return <div className="py-4 border-t border-gray-200" key={index}>
							<h5 className="text-base line-clamp-1 text-black">
								{subtask.title}
							</h5>

							<div className="p-4 space-x-8">
								<span className="text-sm text-gray-600">{formatDate(new Date(subtask.date))}</span>

								<span className="bg-red-400/10 px-3 py-1 rounded-sm text-red-700 font-medium">
									{subtask.tag}
								</span>
							</div>

						</div>
					})

					: <div className="py-4 border-t border-gray-200">
						<span className="text-gray-500">No subtasks</span>
					</div>
			}

			<div className="w-full pb-2">
				<button
					onClick={() => setIsOpen(true)}
					disabled={user.isAdmin ? false : true}
					className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled:text-gray-300"
				>
					<IoMdAdd className="text-lg" />
					<span>Add subtask</span>
				</button>
			</div>

			<AddSubTask open={isOpen} setOpen={setIsOpen} id={task._id} />

		</div>
}