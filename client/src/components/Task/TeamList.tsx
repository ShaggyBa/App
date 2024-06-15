import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { BsChevronExpand, BsX } from "react-icons/bs"
import { MdCheck } from "react-icons/md"
import { useGetTeamUsersQuery } from "state/api/actionsUser"
import { TUser } from "types/app.interface"
import { getInitials } from "utils/index"

export const TeamList = ({ team, setTeam }: { team: TUser[], setTeam: any }) => {

	const { data } = useGetTeamUsersQuery()

	const { t } = useTranslation()

	const [selectedUsers, setSelectedUsers] = useState<TUser[]>(team)

	const userExists = (user: TUser) => {
		return selectedUsers.some((u: TUser) => u._id === user._id)
	}

	const handleRemoveUser = (user: TUser) => {
		const newList = selectedUsers.filter((u: TUser) => u !== user)
		setSelectedUsers(newList);
		setTeam(newList);
	};

	const handleChange = (users: TUser[]) => {

		setSelectedUsers(users)
		setTeam(users.map((user: TUser) => user._id))
	}

	return (
		<div>
			<p className='text-gray-700'>{t("AssignTaskTo")}</p>
			<Listbox
				value={selectedUsers}
				onChange={(el) => handleChange(el)}
				multiple
			>
				<div className='relative mt-1'>
					<Listbox.Button className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'>
						<span className='block truncate'>
							{selectedUsers?.map((user: TUser) => (
								<span className="flex items-center" key={user._id}>
									<span className='block truncate'>{user.name}</span>
									<span
										className='block ml-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300'
										onClick={() => handleRemoveUser(user)}
									>
										<BsX className='h-3 w-3'></BsX>
									</span>
								</span>
							))}
						</span>

						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
							<BsChevronExpand
								className='h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
						</span>
					</Listbox.Button>


					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
							{data?.map((user: TUser, index: number) => (
								<Listbox.Option
									key={index}
									className={({ active }) =>
										`flex relative cursor-default select-none py-2 pl-10 pr-4. ${active || userExists(user) ? "bg-amber-100 text-amber-900" : "text-gray-900"
										} `
									}
									value={user}
									disabled={userExists(user)}
								>
									{({ selected }) => (
										<>
											<div
												className={clsx(
													"flex items-center gap-2 truncate",
													selected || userExists(user) ? "font-medium" : "font-normal"
												)}
											>
												<div className='w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600'>
													<span className='text-center text-[10px]'>
														{getInitials(user.name)}
													</span>
												</div>
												<span>{user.name}</span>
											</div>
											{selected || userExists(user) ? (
												<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
													<MdCheck className='h-5 w-5' aria-hidden='true' />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);

}