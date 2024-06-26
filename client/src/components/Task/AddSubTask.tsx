import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import Button from "components/Button";
import { ModalWrapper } from "components/ModalWrapper";
import { Textbox } from "components/TextBox";
import { useCreateSubTaskMutation } from "state/api/tasks";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const AddSubTask = ({ open, setOpen, id }: { open: boolean, setOpen: any, id?: string }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [addSubTask] = useCreateSubTaskMutation();

	const { t } = useTranslation()

	const handleOnSubmit = async (data: any) => {
		try {
			await addSubTask({ data, id }).unwrap();
			toast.success(t("CreatedSubTaskMsg"));
			setTimeout(() => {
				window.location.reload();
				setOpen(false);
			}, 500);
		} catch (err) {
			toast.error(t("SomethingWentWrong") + err);
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
						{t("AddSubTask")}
					</Dialog.Title>
					<div className='mt-2 flex flex-col gap-6'>
						<Textbox
							placeholder={t('SubTaskTitle')}
							type='text'
							name='title'
							label={t('Title')}
							className='w-full rounded'
							register={register("title", {
								required: `${t('Title')} ${t('IsRequired')}`,
							})}
							error={errors.title ? errors.title.message : ""}
						/>

						<div className='flex items-center gap-4'>
							<Textbox
								placeholder='Date'
								type='date'
								name='date'
								label={(t('Date'))}
								className='w-full rounded'
								register={register("date", {
									required: `${t('Date')} ${t('IsRequired')}`,
								})}
								error={errors.date ? errors.date.message : ""}
							/>
							<Textbox
								placeholder={t('Tag')}
								type='text'
								name='tag'
								label={t('Tag')}
								className='w-full rounded'
								register={register("tag", {
									required: `${t('Tag')} ${t('IsRequired')}`,
								})}
								error={errors.tag ? errors.tag.message : ""}
							/>
						</div>
					</div>
					<div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
						<Button
							type='submit'
							className='bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto'
							label={t('AddSubTaskBtn')}
						/>

						<Button
							type='button'
							className='bg-white border text-sm font-semibold text-gray-900 sm:w-auto'
							onClick={() => setOpen(false)}
							label={t('Cancel')}
						/>
					</div>
				</form>
			</ModalWrapper>
		</>
	);
};

