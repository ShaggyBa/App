import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import Button from "components/Button"
import { ModalWrapper } from "components/ModalWrapper"
import { FaQuestion } from "react-icons/fa"

type Props = {
	open: boolean
	setOpen: (open: boolean) => void
	msg?: string
	setMsg?: (msg: string) => void
	onClick?: () => void
	type?: string
	setType?: (type: "delete" | "cancel") => void
}

export const ConfirmationWindow = (
	{
		open,
		setOpen,
		msg,
		setMsg = () => { },
		onClick = () => { },
		type = "restore",
		setType = () => { },
	}: Props) => {

	const closeDialog = () => {
		setType("delete");
		setMsg("");
		setOpen(false);
	};

	return (
		<>
			<ModalWrapper open={open} setOpen={closeDialog}>
				<div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
					<Dialog.Title as='h3' className=''>
						<p
							className={clsx(
								"p-3 rounded-full ",
								type === "restore" || type === "restoreAll"
									? "text-purple-600 bg-purple-100"
									: "text-red-600 bg-red-200"
							)}
						>
							<FaQuestion size={60} />
						</p>
					</Dialog.Title>

					<p className='text-center text-gray-500'>
						{msg ?? "Are you sure you want to delete the selected record?"}
					</p>

					<div className='bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4'>
						<Button
							type='button'
							className={clsx(
								" px-8 text-sm font-semibold text-white sm:w-auto",
								type === "restore" || type === "restoreAll"
									? "bg-purple-600"
									: "bg-red-600 hover:bg-red-500"
							)}
							onClick={onClick}
							label={type === "restore" ? "Restore" : "Delete"}
						/>

						<Button
							type='button'
							className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
							onClick={() => closeDialog()}
							label='Cancel'
						/>
					</div>
				</div>
			</ModalWrapper>
		</>
	);
}