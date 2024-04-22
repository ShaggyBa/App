import clsx from "clsx";
import Button from "components/Button";
import { ConfirmationWindow } from "components/TaskSettings/ConfirmationWindow";
import { Title } from "components/Title";
import { ListHead } from "components/TrashList/ListHead";
import { ListRow } from "components/TrashList/ListRow";
import { AddUserForm } from "components/UsersList/AddUserForm";
import { tasks } from "data/data";
import { useState } from "react";
import {
	MdDelete,
	MdOutlineRestore,
} from "react-icons/md";
import { ITask } from "types/task.types";
import { PRIORITY_STYLES, TASK_TYPE } from "utils/index";


const Trash = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [open, setOpen] = useState(false);
	const [msg, setMsg] = useState("");
	const [type, setType] = useState("delete");
	const [selected, setSelected] = useState("");

	const deleteAllClick = () => {
		setType("deleteAll");
		setMsg("Do you want to permenantly delete all items?");
		setOpenDialog(true);
	};

	const restoreAllClick = () => {
		setType("restoreAll");
		setMsg("Do you want to restore all items in the trash?");
		setOpenDialog(true);
	};

	const deleteClick = (id: string) => {
		setType("delete");
		setMsg("Do you want to delete the selected item?");
		setSelected(id);
		setOpenDialog(true);
	};

	const restoreClick = (id: string) => {
		setSelected(id);
		setType("restore");
		setMsg("Do you want to restore the selected item?");
		setOpenDialog(true);
	}

	const deleteRestoreHandler = () => { }

	return (
		<>
			<div className='w-full md:px-1 px-0 mb-6'>
				<div className='flex items-center justify-between mb-8'>
					<Title title='Trashed Tasks' />

					<div className='flex gap-2 md:gap-4 items-center'>
						<Button
							label='Restore All'
							icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
							className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
							onClick={() => restoreAllClick()}
						/>
						<Button
							label='Delete All'
							icon={<MdDelete className='text-lg hidden md:flex' />}
							className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
							onClick={() => deleteAllClick()}
						/>
					</div>
				</div>
				<div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
					<div className='overflow-x-auto'>
						<table className='w-full mb-5'>
							<ListHead />
							<tbody>
								{tasks?.map((tk, id) => (
									<ListRow key={id} item={tk} deleteHandler={deleteClick} restoreHandler={restoreClick} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<AddUserForm open={open} setOpen={setOpen} />

			<ConfirmationWindow
				open={openDialog}
				setOpen={setOpenDialog}
				msg={msg}
				setMsg={setMsg}
				type={type}
				setType={setType}
				onClick={() => deleteRestoreHandler()}
			/>
		</>
	);
};

export default Trash;