import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import Button from "components/Button"
import { ModalWrapper } from "components/ModalWrapper"
import { useTranslation } from "react-i18next"
import { FaQuestion } from "react-icons/fa"

type Props = {
	open: boolean
	setOpen: (open: boolean) => void
	msg?: string
	setMsg?: (msg: string) => void
	onClick?: (param: any) => void
	type?: string
	setType?: (type: "delete" | "cancel") => void
	param?: any
}

export const ConfirmationWindow = (
	{
		open,
		setOpen,
		msg,
		setMsg = () => { },
		onClick = () => { },
		type,
		setType = () => { },
		param
	}: Props) => {


	const { i18n, t } = useTranslation()

	const closeDialog = () => {
		setType("delete");
		setMsg("");
		setOpen(false);
	};

	const onClickHandler = () => {
		onClick(param);
		closeDialog();
	}


	const confirmationMessage = i18n.language === 'en' ? `Are you sure you want to ${type === "restore" ? "restore" : "delete"} the selected record?`
		: `Вы уверены, что хотите ${type === "restore" ? "восстановить" : "удалить"} выбранный элемент?`

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
						{msg ?? confirmationMessage}
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
							onClick={() => onClickHandler()}
							label={(type === "restore" || type === "restoreAll") ? t("Restore") : t("Delete")}
						/>

						<Button
							type='button'
							className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border'
							onClick={closeDialog}
							label={t('Cancel')}
						/>
					</div>
				</div>
			</ModalWrapper>
		</>
	);
}