import Button from "components/Button"
import { Actions } from "components/TaskSettings/Actions"
import { ConfirmationWindow } from "components/TaskSettings/ConfirmationWindow"
import { Title } from "components/Title"
import { AddUser } from "components/UsersList/AddUser"
import { ListHead } from "components/UsersList/ListHead"
import { ListRow } from "components/UsersList/ListRow"
import { summary } from "data/data"
import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { toast } from "sonner"
import { useDeleteUserMutation, useGetTeamUsersQuery } from "state/api/actionsUser"

const Users = () => {

	const [openDialog, setOpenDialog] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [openAction, setOpenAction] = useState(false)
	const [selected, setSelected] = useState("")
	const [currentUsersList, setCurrentUsersList] = useState([])

	const { data: getUsers } = useGetTeamUsersQuery()

	const [deleteUser] = useDeleteUserMutation()


	const deleteClick = (id: string) => {
		setSelected(id);
		setOpenDialog(true);
	};

	const editClick = (el: any) => {
		setSelected(el);
		setIsOpen(true);
	};

	const deleteHandler = async (userId: string) => {
		await deleteUser(userId)
	}

	const userActionHandler = async (userId: string) => {
		try {

		}
		catch (err) {
			toast.error(err?.data?.message || err.message)
		}
	}

	const addNewUserHandler = () => {
		setIsOpen(true)
		setSelected("")
	}

	useEffect(() => {
		setCurrentUsersList(getUsers)
	}, [getUsers])

	return (
		<>
			<div className="w-full md:px-1 px-0 mb-6">
				<div className="flex items-center justify-between mb-8">
					<Title title="Team members" />
					<Button
						label="Add User"
						icon={<IoMdAdd className="text-lg" />}
						className="flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md py-2 2xl:py-2.5"
						onClick={addNewUserHandler}
					/>
				</div>

				<div className="bg-white px-2 md:px-4 py-4">
					<div className="overflow-x-auto">
						{currentUsersList
							?
							<table className="w-full mb-5">
								<ListHead />
								<tbody>
									{currentUsersList?.map((user, index: number) => (
										<ListRow
											key={index}
											user={user}
											editHandler={editClick}
											deleteHandler={deleteClick}
										/>
									))}
								</tbody>
							</table>
							: <p>Team is empty.</p>}
					</div>
				</div>

			</div>

			<AddUser
				open={isOpen}
				setOpen={setIsOpen}
				selectedUser={selected}
				key={new Date().getTime().toString()}
			/>

			<ConfirmationWindow
				open={openDialog}
				setOpen={setOpenDialog}
				msg="Do you want to remove this user?"
				onClick={deleteHandler}
			/>

			<Actions
				open={openAction}
				setOpen={setOpenAction}
				onClick={userActionHandler}
			/>

		</>
	)
}

export default Users