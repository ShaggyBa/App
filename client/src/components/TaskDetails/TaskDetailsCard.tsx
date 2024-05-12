import moment from "moment";
import { FaThumbsUp, FaUser, FaBug } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineMessage, MdOutlineDoneAll } from "react-icons/md";


const TASKTYPEICON: { [key: string]: JSX.Element } = {
	commented: (
		<div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
			<MdOutlineMessage />,
		</div>
	),
	started: (
		<div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
			<FaThumbsUp size={20} />
		</div>
	),
	assigned: (
		<div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
			<FaUser size={14} />
		</div>
	),
	bug: (
		<div className='text-red-600'>
			<FaBug size={24} />
		</div>
	),
	completed: (
		<div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
			<MdOutlineDoneAll size={24} />
		</div>
	),
	"in progress": (
		<div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
			<GrInProgress size={16} />
		</div>
	),
};

export const TaskDetailsCard = ({ item }: { item: any }) => {
	return (
		<div className='flex space-x-4'>
			<div className='flex flex-col items-center flex-shrink-0'>
				<div className='w-10 h-10 flex items-center justify-center'>
					{TASKTYPEICON[item?.type]}
				</div>
				<div className='w-full flex items-center'>
					<div className='w-0.5 bg-gray-300 h-full'></div>
				</div>
			</div>

			<div className='flex flex-col gap-y-1 mb-8'>
				<p className='font-semibold'>{item?.by?.name}</p>
				<div className='text-gray-500 space-y-2'>
					<span className='capitalize'>{item?.type}</span>
					<span className='text-sm'>{moment(item?.date).fromNow()}</span>
				</div>
				<div className='text-gray-700'>{item?.activity}</div>
			</div>
		</div>
	);
};