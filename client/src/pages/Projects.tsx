import { Loader } from "components/Loader"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { useGetProjectsQuery } from "state/api/projects"

function Projects() {

	const { t } = useTranslation()

	const [projects, setProjects] = useState([])

	const { data, isLoading } = useGetProjectsQuery()


	useEffect(() => {
		if (data) {
			setProjects(data.projects)
			toast.success(t("ProjectsFetched"))
		}
	}, [data])
	console.log(projects)

	return <>
		{isLoading
			? <Loader />
			: projects.map((project: any, index) => <div key={new Date().getTime()}>{project?.name}</div>)
		}
	</>
}

export default Projects