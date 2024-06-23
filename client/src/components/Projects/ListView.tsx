import { ListHead } from "components/Projects/ListHead";
import { ListRow } from "components/Projects/ListRow";
import { TProject } from "types/project.types";

type Props = {
	projects: TProject[] | [],
	setOpenEdit: any,
	setSelectedProject: React.Dispatch<React.SetStateAction<TProject | undefined>>,
	setOpenDialog: any,
}

export const ListView = ({ projects, setOpenEdit, setSelectedProject, setOpenDialog }: Props) => {

	return <>
		<div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
			<div className="overflow-x-auto">
				<table className="w-full">
					<ListHead />
					<tbody>
						{projects.map((project: TProject, index: number) => (
							<ListRow
								setSelectedProject={setSelectedProject}
								setOpenEdit={setOpenEdit}
								setOpenDialog={setOpenDialog}
								key={index}
								project={project}

							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	</>
}