import { Loader } from "components/Loader"
import { ConfirmationWindow } from "components/TaskSettings/ConfirmationWindow"
import { ListView } from "components/Projects/ListView"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { useDeleteProjectMutation, useGetProjectsQuery } from "state/api/projects"
import { TProject } from "types/project.types"
import Button from "components/Button"
import { Title } from "components/Title"
import { IoMdAdd } from "react-icons/io"
import { useDispatch } from "react-redux"
import { getProjects } from "state/features/projectsSlice"
import { AddProject } from "components/Projects/AddProject"
import { useSelector } from "react-redux";
import { getProjectsSelector } from "state/selectors/projects"
function Projects() {

	const { t } = useTranslation()

	const [projects, setProjects] = useState<{ userProjects: TProject[], otherProjects: TProject[] }>({
		userProjects: [],
		otherProjects: []
	})

	const { data, isLoading } = useGetProjectsQuery()

	const [deleteProjectReq] = useDeleteProjectMutation()

	const { user } = useSelector((state: any) => state.auth)

	const dispatch = useDispatch()

	const [selectedProject, setSelectedProject] = useState<TProject | undefined>({} as TProject)

	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [open, setOpen] = useState(false)

	const deleteProjectHandler = async () => {

		try {
			await deleteProjectReq(selectedProject?._id).unwrap()

			toast.success(t("ProjectDeleted"))

			setOpenDialog(false)

		} catch (err: any) {
			toast.error(err?.data?.message || err.message)
		}
	}

	const projectsWithSelector = useSelector(getProjectsSelector)

	useEffect(() => {
		if (data) {
			dispatch(getProjects(data.projects))
		}
	}, [data])

	useEffect(() => {
		if (projectsWithSelector) {

			const userProjects = projectsWithSelector.filter((project: TProject) => project.owner === user._id)

			const otherProjects = projectsWithSelector.filter((project: TProject) => project.owner !== user._id)

			setProjects((prevState) => ({ ...prevState, userProjects, otherProjects }))
		}
	}, [projectsWithSelector])

	return <>
		{isLoading
			? <Loader />
			: <div className="w-full h-full">
				<>
					<div className="flex items-center justify-between mb-4">
						<Title title={t("YourProjects")} />

						<Button
							onClick={() => {
								setSelectedProject(undefined)
								setOpen(true)
							}}
							label={t("CreateProject")}
							icon={<IoMdAdd className="text-lg" />}
							className={"flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md py-2 2xl:py-2.5"}

						/>
					</div>
					<ListView
						projects={projects.userProjects}
						setOpenEdit={setOpen}
						setSelectedProject={setSelectedProject}
						setOpenDialog={setOpenDialog}
					/>
				</>
				<>
					<div className="flex items-center justify-between my-4">
						<Title title={t("OtherProjects")} />

					</div>
					<ListView
						projects={projects.otherProjects}
						setOpenEdit={setOpen}
						setSelectedProject={setSelectedProject}
						setOpenDialog={setOpenDialog}
					/>
				</>
				<AddProject
					open={open}
					setOpen={setOpen}
					project={selectedProject}
				/>

				<ConfirmationWindow
					open={openDialog}
					setOpen={setOpenDialog}
					onClick={deleteProjectHandler}
				/>
			</div>
		}
	</>
}

export default Projects