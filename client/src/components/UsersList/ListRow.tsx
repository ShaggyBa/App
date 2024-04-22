import clsx from "clsx";
import Button from "components/Button";
import { getInitials } from "utils/index";
import { IUserTableInfo } from "types/user.types"

export const ListRow = ({ user, statusHandler, editHandler, deleteHandler }: { user: IUserTableInfo, statusHandler: any, editHandler: any, deleteHandler: any }) => (
	<tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
		<td className='p-2'>
			<div className='flex items-center gap-3'>
				<div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-red-700 shrink-0'>
					<span className='text-xs md:text-sm text-center'>
						{getInitials(user.name)}
					</span>
				</div>
				{user.name}
			</div>
		</td>

		<td className='p-2'>{user.title}</td>
		<td className='p-2'>{user.email || "user.email.com"}</td>
		<td className='p-2'>{user.role}</td>

		<td className='p-2'>
			<button
				onClick={() => statusHandler(user)}
				className={clsx(
					"w-fit px-4 py-1 rounded-full",
					user?.isActive ? "bg-red-200" : "bg-yellow-100"
				)}
			>
				{user?.isActive ? "Active" : "Disabled"}
			</button>
		</td>

		<td className='p-2 flex gap-4 justify-end'>
			<Button
				className='text-red-600 hover:text-blue-500 font-semibold sm:px-0'
				label='Edit'
				type='button'
				onClick={() => editHandler(user)}
			/>

			<Button
				className='text-purple-700 hover:text-red-500 font-semibold sm:px-0'
				label='Delete'
				type='button'
				onClick={() => deleteHandler(user)}
			/>
		</td>
	</tr>
);