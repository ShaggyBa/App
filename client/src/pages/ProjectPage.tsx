import { Loader } from "components/Loader"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useGetProjectQuery } from "state/api/projects"
import { TProject } from "types/project.types"

function ProjectPage() {
	const { id }: any = useParams();

	const { t } = useTranslation()

	const [project, setProject] = useState<TProject | null>(null)

	const { data, isLoading } = useGetProjectQuery(id)


	useEffect(() => {
		if (data) {
			setProject(data)
			toast.success(t("ProjectsFetched"))
		}
	}, [data])
	console.log(project)

	return <>
		{isLoading
			? <Loader />
			: <div key={new Date().getTime()}>{project ? <div><p>{project?.name}</p><p>{project?.tasks.length}</p></div> : ""}</div>
		}
	</>
}

export default ProjectPage