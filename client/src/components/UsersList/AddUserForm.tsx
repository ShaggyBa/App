import { Dialog } from "@headlessui/react";
import Button from "components/Button";
import { Loader } from "components/Loader";
import { ModalWrapper } from "components/ModalWrapper";
import { Textbox } from "components/TextBox";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useUpdateUserProfileMutation } from "state/api/actionsUser";
import { useRegisterMutation } from "state/api/user";
import { setCredentials } from "state/features/authSlice";
import { TUser } from "types/app.interface";

export const AddUserForm = ({ open, setOpen, selectedUser, refetchRequest }: { open: boolean, setOpen: (open: boolean) => void, selectedUser?: TUser, refetchRequest?: any }) => {
	let defaultValues = selectedUser ? { ...selectedUser } : {
		name: "",
		title: "",
		email: "",
		password: "",
		role: "",
	};


	const { user } = useSelector((state: any) => state.auth);

	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	}: any = useForm({ defaultValues });

	const [addNewUser, { isLoading }] = useRegisterMutation()
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserProfileMutation()

	const handleOnSubmit = async (data: { name: string, title: string, email: string, password: string, role: string }) => {
		try {
			if (!selectedUser) {
				await addNewUser(data).unwrap()
				await refetchRequest()
				toast.success("User added successfully")
			}
			else {
				const res = await updateUser({ ...data }).unwrap()
				console.log(res)
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
			toast.error("Something went wrong: " + err.message)
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
						{selectedUser ? "UPDATE PROFILE" : "ADD NEW USER"}
					</Dialog.Title>
					<div className='mt-2 flex flex-col gap-6'>
						<Textbox
							placeholder='Full name'
							type='text'
							name='name'
							label='Full Name'
							className='w-full rounded'
							register={register("name", {
								required: selectedUser ? false : "Full name is required!",
							})}
							error={errors.name ? errors.name.message : ""}
						/>
						<Textbox
							placeholder='Title'
							type='text'
							name='title'
							label='Title'
							className='w-full rounded'
							register={register("title", {
								required: selectedUser ? false : "Title is required!",
							})}
							error={errors.title ? errors.title.message : ""}
						/>
						<Textbox
							placeholder='Email Address'
							type='email'
							name='email'
							label='Email Address'
							className='w-full rounded'
							register={register("email", {
								required: selectedUser ? false : "Email Address is required!",
							})}
							error={errors.email ? errors.email.message : ""}
						/>

						<Textbox
							placeholder='Password'
							type='password'
							name='password'
							label='Password'
							className='w-full rounded'
							register={register("password", {
								required: selectedUser ? false : "Password is required!",
							})}
							error={errors.password ? errors.password.message : ""}
						/>

						<Textbox
							placeholder='Role'
							type='text'
							name='role'
							label='Role'
							className='w-full rounded'
							register={register("role", {
								required: selectedUser ? false : "User role is required!",
							})}
							error={errors.role ? errors.role.message : ""}
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
								label='Submit'
							/>

							<Button
								type='button'
								className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
								onClick={() => setOpen(false)}
								label='Cancel'
							/>
						</div>
					)}
				</form>
			</ModalWrapper>
		</>
	);
};