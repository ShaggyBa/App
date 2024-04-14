import clsx from "clsx";
import Button from "components/Button";
import { UserInfo } from "components/UserInfo";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { ITask } from "types/task.types";
import { TASK_TYPE, formatDate, BGS, PRIORITY_STYLES } from "utils/index";
import { MdKeyboardDoubleArrowUp, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const ICONS: { [key: string]: JSX.Element } = {
	high: <MdKeyboardDoubleArrowUp />,
	medium: <MdKeyboardArrowUp />,
	low: <MdKeyboardArrowDown />,
};



export const ListRow = ({ task, setSelected, setOpenDialog }: { task: ITask, setSelected: any, setOpenDialog: any }) => {

	const deleteClicks = (id: string) => {
		setSelected(id)
		console.log(id)
		setOpenDialog(true)
	}

	return <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
		<td className='py-2'>
			<div className='flex items-center gap-2'>
				<div
					className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
				/>
				<p className='w-full line-clamp-2 text-base text-black'>
					{task?.title}
				</p>
			</div>
		</td>

		<td className='py-2'>
			<div className={"flex gap-1 items-center"}>
				<span className={clsx("text-lg", PRIORITY_STYLES[task?.priority])}>
					{ICONS[task?.priority]}
				</span>
				<span className='capitalize line-clamp-1'>
					{task?.priority} Priority
				</span>
			</div>
		</td>

		<td className='py-2'>
			<span className='text-sm text-gray-600'>
				{formatDate(new Date(task?.date))}
			</span>
		</td>

		<td className='py-2'>
			<div className='flex items-center gap-3'>
				<div className='flex gap-1 items-center text-sm text-gray-600'>
					<BiMessageAltDetail />
					<span>{task?.activities?.length}</span>
				</div>
				<div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
					<MdAttachFile />
					<span>{task?.assets?.length}</span>
				</div>
				<div className='flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400'>
					<FaList />
					<span>0/{task?.subTasks?.length}</span>
				</div>
			</div>
		</td>

		<td className='py-2'>
			<div className='flex gap-1.5'>
				{task?.team?.map((member, index) => (
					<div
						key={member._id}
						className={clsx(
							"w-4 h-4 rounded-full text-white flex items-center justify-center text-sm -mr-1",
							BGS[index % BGS?.length]
						)}
					>
						<UserInfo user={member} bgColor={BGS[index % BGS?.length]} />
					</div>
				))}
			</div>
		</td>

		<td className='py-2 flex gap-2 md:gap-4 justify-end'>
			<Button
				className='text-red-600 hover:text-red-500 sm:px-0 text-sm md:text-base'
				label='Edit'
				type='button'
			/>

			<Button
				className='text-purple-700 hover:text-purple-500 sm:px-0 text-sm md:text-base'
				label='Delete'
				type='button'
				onClick={() => deleteClicks(task._id)}
			/>
		</td>
	</tr>
};