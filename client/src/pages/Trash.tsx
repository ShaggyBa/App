import Button from "components/Button";
import { Loader } from "components/Loader";
import { ConfirmationWindow } from "components/TaskSettings/ConfirmationWindow";
import { Title } from "components/Title";
import { ListHead } from "components/TrashList/ListHead";
import { ListRow } from "components/TrashList/ListRow";
import { AddUserForm } from "components/UsersList/AddUserForm";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	MdDelete,
	MdOutlineRestore,
} from "react-icons/md";
import { toast } from "sonner";
import { useDeleteOrRestoreTaskMutation, useGetAllTasksQuery } from "state/api/tasks";
import { ITask } from "types/task.types";


const Trash = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [open, setOpen] = useState(false);
	const [msg, setMsg] = useState("");
	const [type, setType] = useState("delete");
	const [selected, setSelected] = useState("");

	const [tasks, setTasks] = useState<ITask[] | undefined>([] as ITask[]);

	const { data, isLoading, refetch } = useGetAllTasksQuery({ strQuery: "", isTrashed: "true", search: "" })

	const { t } = useTranslation()

	const [deleteOrRestoreTask] = useDeleteOrRestoreTaskMutation();

	const deleteAllClick = () => {
		setType("deleteAll");
		setMsg(t("DeleteAllTrashedItemsMsg"));
		setOpenDialog(true);
	};

	const restoreAllClick = () => {
		setType("restoreAll");
		setMsg(t("RestoreAllTrashedItemsMsg"));
		setOpenDialog(true);
	};

	const deleteClick = (id: string) => {
		setType("delete");
		setMsg(t("DeleteTrashedItemMsg"));
		setSelected(id);
		setOpenDialog(true);
	};

	const restoreClick = (id: string) => {
		setSelected(id);
		setType("restore");
		setMsg(t("RestoreTrashedItemMsg"));
		setOpenDialog(true);
	}

	const deleteRestoreHandler = async () => {
		try {
			switch (type) {
				case "delete":
					await deleteOrRestoreTask({ id: selected, actionType: "delete" }).unwrap()
					toast.success(t("TaskDeletedSuccessfullyMsg"))
					break;
				case "restore":
					await deleteOrRestoreTask({ id: selected, actionType: "restore" }).unwrap()
					toast.success(t("TaskRestoredSuccessfullyMsg"))
					break;
				case "deleteAll":
					await deleteOrRestoreTask({ id: "", actionType: "deleteAll" }).unwrap()
					break;
				case "restoreAll":
					await deleteOrRestoreTask({ id: "", actionType: "restoreAll" }).unwrap()
					break;

				default:
					break;
			}


			setTimeout(() => {
				setOpenDialog(false)
				refetch()
			}, 500)
		} catch (err) {
			toast.error(t("SomethingWentWrong") + err)
		}
	}

	useEffect(() => {
		if (data && data.tasks) {
			setTasks(data.tasks)
		}
	}, [data])


	return (
		<div>
			{
				isLoading
					? <div className="pt-10"><Loader /></div>
					: <div className='w-full md:px-1 px-0 mb-6'>
						<div className='flex items-center justify-between mb-8'>
							<Title title={t("TrashedTasks")} />

							<div className='flex gap-2 md:gap-4 items-center'>
								<Button
									label={t('RestoreAll')}
									icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
									className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
									onClick={() => restoreAllClick()}
								/>
								<Button
									label={t('DeleteAll')}
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
			}

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
		</div>
	);
};

export default Trash;