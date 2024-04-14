import clsx from "clsx";
import Button from "components/Button";
import { MdOutlineRestore, MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { ITask } from "types/task.types";
import { TASK_TYPE, PRIORITY_STYLES } from "utils/index";

const ICONS: { [key: string]: JSX.Element } = {
	high: <MdKeyboardDoubleArrowUp />,
	medium: <MdKeyboardArrowUp />,
	low: <MdKeyboardArrowDown />,
};


export const ListRow = ({ item, restoreHandler, deleteHandler }: { item: ITask, restoreHandler: (id: string) => void, deleteHandler: (id: string) => void }) => (
	<tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
		<td className='py-2'>
			<div className='flex items-center gap-2'>
				<div
					className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}
				/>
				<p className='w-full line-clamp-2 text-base text-black'>
					{item?.title}
				</p>
			</div>
		</td>

		<td className='py-2 capitalize'>
			<div className={"flex gap-1 items-center"}>
				<span className={clsx("text-lg", PRIORITY_STYLES[item?.priority])}>
					{ICONS[item?.priority]}
				</span>
				<span className=''>{item?.priority}</span>
			</div>
		</td>

		<td className='py-2 capitalize text-center md:text-start'>
			{item?.stage}
		</td>
		<td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

		<td className='py-2 flex gap-1 justify-end'>
			<Button
				icon={<MdOutlineRestore className='text-xl text-gray-500' />}
				onClick={() => restoreHandler(item._id)}
			/>
			<Button
				icon={<MdDelete className='text-xl text-red-600' />}
				onClick={() => deleteHandler(item._id)}
			/>
		</td>
	</tr>
);