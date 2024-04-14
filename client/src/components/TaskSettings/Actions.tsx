import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import Button from "components/Button";
import { ModalWrapper } from "components/ModalWrapper";
import { FaQuestion } from "react-icons/fa";

export const Actions = ({ open, setOpen, onClick }: { open: boolean, setOpen: any, onClick: any }) => {
	const closeDialog = () => {
		setOpen(false);
	};

	return (
		<>
			<ModalWrapper open={open} setOpen={closeDialog}>
				<div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
					<Dialog.Title as='h3' className=''>
						<p className={clsx("p-3 rounded-full ", "text-red-600 bg-red-400")}>
							<FaQuestion size={60} />
						</p>
					</Dialog.Title>

					<p className='text-center text-gray-500'>
						{"Are you sure you want to activate or deactive this account?"}
					</p>

					<div className='bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4'>
						<Button
							type='button'
							className={clsx(
								" px-8 text-sm font-semibold text-white sm:w-auto",
								"bg-red-600 hover:bg-red-500"
							)}
							onClick={onClick}
							label={"Yes"}
						/>

						<Button
							type='button'
							className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
							onClick={() => closeDialog()}
							label='No'
						/>
					</div>
				</div>
			</ModalWrapper>
		</>
	);
}