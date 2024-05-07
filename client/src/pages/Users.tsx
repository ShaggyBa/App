import Button from "components/Button"
import { Actions } from "components/TaskSettings/Actions"
import { ConfirmationWindow } from "components/TaskSettings/ConfirmationWindow"
import { Title } from "components/Title"
import { AddUserForm } from "components/UsersList/AddUserForm"
import { ListHead } from "components/UsersList/ListHead"
import { ListRow } from "components/UsersList/ListRow"
import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { toast } from "sonner"
import { useDeleteUserMutation, useGetTeamUsersQuery, useSetUserStatusMutation } from "state/api/actionsUser"
import { TUser } from "types/app.interface"

const Users = () => {

	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
	const [openEditModal, setOpenEditModal] = useState<boolean>(false)
	const [openAction, setOpenAction] = useState<boolean>(false)
	const [selected, setSelected] = useState<TUser | null>(null)
	const [currentUsersList, setCurrentUsersList] = useState([])

	const { data: getUsers, refetch } = useGetTeamUsersQuery()

	const [deleteUser] = useDeleteUserMutation()

	const [userSetStatus] = useSetUserStatusMutation()

	const handleSetOpenDeleteModal = (user: TUser) => {
		setSelected(user);
		setOpenDeleteModal(true);
	};

	const handleSetUserManageModal = (user?: TUser) => {
		if (user) {
			setSelected(user);
		}
		else {
			setSelected(null)
		}

		setOpenEditModal(true)
	}

	const handleSetUserStatus = (user: TUser) => {
		setSelected(user);
		setOpenAction(true);
	}

	const deleteHandler = async (user: TUser) => {
		try {
			await deleteUser(user._id)
			await refetch()
			toast.success(`User: ${user.name} was deleted successfully`)
		}
		catch (err: any) {
			toast.error("Error while deleting: " + err.message);
		}
	}

	const userActionHandler = async () => {
		try {
			if (selected === null) throw new Error("Please select a user")
			const result = await userSetStatus({ userId: selected._id, isActive: !selected.isActive })
			updateTable(result.data.message)

			setOpenAction(false)
		}
		catch (err: any) {
			toast.error(err.message);
		}
	}

	const updateTable = (msg?: string) => {
		refetch()
		toast.success(msg || "Successfully")
		setSelected(null)
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
						onClick={() => handleSetUserManageModal()}
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
											statusHandler={handleSetUserStatus}
											editHandler={handleSetUserManageModal}
											deleteHandler={handleSetOpenDeleteModal}
										/>
									))}
								</tbody>
							</table>
							: <p>Team is empty.</p>}
					</div>
				</div>

			</div>

			<AddUserForm
				open={openEditModal}
				setOpen={setOpenEditModal}
				selectedUser={selected || undefined}
				refetchRequest={refetch}
				key={new Date().getTime().toString()}
			/>

			<ConfirmationWindow
				open={openDeleteModal}
				setOpen={setOpenDeleteModal}
				msg="Do you want to remove this user?"
				onClick={deleteHandler}
				param={selected}
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