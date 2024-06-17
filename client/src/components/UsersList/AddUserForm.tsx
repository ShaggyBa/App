import { Dialog } from "@headlessui/react";
import Button from "components/Button";
import { Loader } from "components/Loader";
import { ModalWrapper } from "components/ModalWrapper";
import { SelectList } from "components/Task/SelectList";
import { Textbox } from "components/TextBox";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useUpdateUserProfileMutation } from "state/api/actionsUser";
import { useRegisterMutation } from "state/api/user";
import { setCredentials } from "state/features/authSlice";
import { TUser } from "types/app.interface";

export const AddUserForm = ({ open, setOpen, selectedUser, refetchRequest }: { open: boolean, setOpen: (open: boolean) => void, selectedUser?: TUser, refetchRequest?: any }) => {
	const defaultValues: TUser | {} = selectedUser ? { ...selectedUser } : {
		name: "",
		title: "",
		email: "",
		password: "",
		role: "",
	};


	const { user } = useSelector((state: any) => state.auth);

	const { t } = useTranslation()

	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	}: any = useForm({ defaultValues });

	const [addNewUser, { isLoading }] = useRegisterMutation()
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserProfileMutation()

	const [selectedPermission, setSelectedPermission] = useState<string>("developer")

	const handleOnSubmit = async (data: { name: string, title: string, email: string, password: string, role: string }) => {
		try {
			if (!selectedUser) {
				await addNewUser({ ...data, role: selectedPermission }).unwrap()
				if (refetchRequest)
					await refetchRequest()
				toast.success("User added successfully")
			}
			else {
				const res = await updateUser({ ...data, role: selectedPermission }).unwrap()
				if (refetchRequest)
					await refetchRequest()
				toast.success("User updated successfully")

				if (user?._id === selectedUser?._id) {
					dispatch(setCredentials({ ...res.user }))
				}
			}

			setTimeout(() => {
				setOpen(false);
				reset()

			}, 500);
		}
		catch (err: any) {
			toast.error(t("SomethingWentWrong") + err.message)
		}

	};

	return (
		<>
			<ModalWrapper open={open} setOpen={setOpen}>
				<form onSubmit={handleSubmit(handleOnSubmit)} className=''>
					<Dialog.Title
						as='h2'
						className='text-base font-bold leading-6 text-gray-900 mb-4'
					>
						{selectedUser ? t("UpdateUser") : t("AddNewUser")}
					</Dialog.Title>
					<div className='mt-2 flex flex-col gap-6'>
						<Textbox
							placeholder={t('FullName')}
							type='text'
							name='name'
							label={t('FullName')}
							className='w-full rounded'
							register={register("name", {
								required: selectedUser ? false : `${t('FullName')} ${t('IsRequired')}`,
							})}
							error={errors.name ? errors.name.message : ""}
						/>
						<Textbox
							placeholder={t('Title')}
							type='text'
							name='title'
							label={t('Title')}
							className='w-full rounded'
							register={register("title", {
								required: selectedUser ? false : `${t('Title')} ${t('IsRequired')}`,
							})}
							error={errors.title ? errors.title.message : ""}
						/>
						{!selectedUser && <Textbox
							placeholder={t("Email")}
							type='email'
							name='email'
							label={t('Email')}
							className='w-full rounded'
							register={register("email", {
								required: selectedUser ? false : `${t('Email')} ${t('IsRequired')}`,
							})}
							error={errors.email ? errors.email.message : ""}
						/>}

						{!selectedUser && <Textbox
							placeholder={t('Password')}
							type='password'
							name='password'
							label={t('Password')}
							className='w-full rounded'
							register={register("password", {
								required: selectedUser ? false : `${t('Password')} ${t('IsRequired')}`,
							})}
							error={errors.password ? errors.password.message : ""}
						/>}
						<SelectList
							label={t("Permission")}
							lists={["developer", "teamlead", "admin"]}
							selected={selectedPermission}
							setSelected={setSelectedPermission}
						/>
					</div>

					{isLoading || isUpdating ? (
						<div className='py-5'>
							<Loader />
						</div>
					) : (
						<div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
							<Button
								type='submit'
								className='bg-red-600 px-8 text-sm font-semibold text-white hover:bg-red-700 rounded  sm:w-auto'
								label={t('Submit')}
							/>

							<Button
								type='button'
								className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
								onClick={() => setOpen(false)}
								label={t('Cancel')}
							/>
						</div>
					)}
				</form>
			</ModalWrapper>
		</>
	);
};