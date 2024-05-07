import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useChangeUserPasswordMutation } from "state/api/actionsUser"
import { ModalWrapper } from "./ModalWrapper"
import { Dialog } from "@headlessui/react"
import { Textbox } from "./TextBox"
import { Loader } from "./Loader"
import Button from "./Button"

export const ChangePassword = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const [changeUserPassword, { isLoading }] = useChangeUserPasswordMutation()

	const handleOnSubmit = async (data: { password: string, cpass: string }) => {
		if (data.password !== data.cpass) {
			toast.warning("Password don't match")
			return
		}
		try {
			const res = await changeUserPassword(data).unwrap()
			toast.success("New password set successfully")

			setTimeout(() => {
				setOpen(false)
			}, 500)
		}
		catch (err: any) {
			toast.error("Error while changing password: " + err?.message || err?.data?.message)
		}

	}

	return <>
		<ModalWrapper open={open} setOpen={setOpen}>
			<form onSubmit={handleSubmit(handleOnSubmit)} className="">
				<Dialog.Title
					as="h2"
					className={"text-base font-bold leading-6 text-gray-900 mb-4"}
				>
					Change Password
				</Dialog.Title>

				<div className="mt-2 flex flex-col gap-6">
					<Textbox
						label="New Password"
						type="password"
						name="password"
						placeholder="Enter new password"
						register={register("password", { required: "New password is required" })}
						className="w-full rounded"
						error={errors.password ? errors.password.message : ""}
					/>

					<Textbox
						label="Confirm New Password"
						type="password"
						name="cpass"
						placeholder="Confirm new password"
						register={register("cpass", { required: "Confirm new password is required" })}
						className="w-full rounded"
						error={errors.cpass ? errors.cpass.message : ""}
					/>
				</div>

				{isLoading
					? <div className="py-5"><Loader /></div>
					: <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
						<Button
							type="submit"
							className="bg-red-600 px-8 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
							label="Save"
						/>
						<button
							type="button"
							className="bg-gray-200 px-5 text-sm font-semibold text-gray-900 sm:w-auto"
							onClick={() => setOpen(false)}
						>
							Cancel
						</button>
					</div>
				}
			</form>
		</ModalWrapper>
	</>
}