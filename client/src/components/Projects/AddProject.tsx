import { Dialog } from "@headlessui/react"
import { ModalWrapper } from "components/ModalWrapper"
import { Textbox } from "components/TextBox"
import { useForm } from "react-hook-form"
import Button from "components/Button"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { TProject } from "types/project.types"
import { toast } from "sonner"
import { useCreateProjectMutation, useUpdateProjectMutation } from "state/api/projects"
import { createProject, updateProject } from "state/features/projectsSlice"
import { getProjectsSelector } from "state/selectors/projects"


export const AddProject = ({ open, setOpen, project }: { open: boolean, setOpen: any, project?: TProject | undefined }) => {

	const defaultValues = {
		name: project?.name || "",
	}

	const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

	const { t } = useTranslation()

	const [createProjectReq] = useCreateProjectMutation()
	const [updateProjectReq] = useUpdateProjectMutation()

	// const [updateTaskQuery] = useUpdateTaskMutation()

	const dispatch = useDispatch()


	const submitHandler = async (data: { name: string }) => {
		try {

			if (!project) {
				const response = await createProjectReq(data).unwrap()
				console.log(response)
				dispatch(createProject(data))

				toast.success(t("ProjectCreated"))
				setTimeout(() => {
					setOpen(false)
					reset()
				}, 500)
			}
			else {
				const responce = await updateProjectReq({ id: project._id, data }).unwrap()

				dispatch(updateProject({ id: project._id, data: responce }))

				toast.success(t("ProjectUpdated"))
				setTimeout(() => {
					setOpen(false)
					reset()
				}, 500)
			}
		} catch (err: any) {
			toast.error(err?.data?.message || err.message)
		}
	}

	return <ModalWrapper open={open} setOpen={setOpen}>
		<form onSubmit={handleSubmit(submitHandler)}>
			<Dialog.Title
				as="h2"
				className={"text-base font-bold leading-6 text-gray-900 mb-4"}
			>
				{project ? t("UpdateProject") : t("CreateProject")}
			</Dialog.Title>

			<div className="mt-2 flex flex-col gap-6">
				<Textbox
					placeholder={project?.name}
					type="text"
					name="name"
					label={t("ProjectName")}
					className="w-full rounded"
					register={register("name", { required: project ? false : `${t("Title")} ${t("IsRequired")}` })}
					error={errors.name ? errors.name.message : ""}
				/>


				<div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
					<Button
						label={t('Submit')}
						type='submit'
						className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
					/>

					<Button
						type='button'
						className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
						onClick={() => setOpen(false)}
						label={t('Cancel')}
					/>
				</div>

			</div>
		</form>
	</ModalWrapper>
}