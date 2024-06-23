import clsx from "clsx";
import Button from "components/Button";
import { UserInfo } from "components/UserInfo";
import { formatDate, BGS } from "utils/index";
import { useTranslation } from "react-i18next";
import { TProject, TTeamInProject } from "types/project.types";
import { useSelector } from "react-redux";




export const ListRow = ({ project, setOpenDialog, setSelectedProject, setOpenEdit }: { project: TProject, setOpenDialog: any, setSelectedProject: any, setOpenEdit: any }) => {

	const onHandleOpenDialog = (project: TProject) => {
		setSelectedProject(project)
		setOpenDialog(true)
	}

	const onHandleOpenEdit = (project: TProject) => {
		setSelectedProject(project)
		setOpenEdit(true)
	}

	const { user } = useSelector((state: any) => state.auth)

	const { t } = useTranslation()

	return <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
		<td className='py-2'>
			<div className='flex items-center gap-2'>
				<p className='w-full line-clamp-2 text-base text-black'>
					<a href={`/projects/${project._id}`}>{project?.name}</a>
				</p>
			</div>
		</td>

		<td className='py-2'>
			<div className='flex gap-1.5'>
				{project?.team?.map((member: TTeamInProject, index) => (
					<div
						key={member.userId}
						className={clsx(
							"w-4 h-4 rounded-full text-white flex items-center justify-center text-sm -mr-1",
							BGS[index % BGS?.length]
						)}
					>
						<UserInfo user={{ name: member.userName, title: member.roleName, email: member.userEmail }} bgColor={BGS[index % BGS?.length]} />
					</div>
				))}
			</div>
		</td>

		<td className='py-2'>
			<span className='text-sm text-gray-600'>
				{formatDate(new Date(project?.createdAt))}
			</span>
		</td>

		{project.owner === user._id && <td className='py-2 flex gap-2 md:gap-4 justify-end'>
			<Button
				className='text-red-600 hover:text-red-500 sm:px-0 text-sm md:text-base'
				label={t("Edit")}
				type='button'
				onClick={() => onHandleOpenEdit(project)}
			/>

			<Button
				className='text-purple-700 hover:text-purple-500 sm:px-0 text-sm md:text-base'
				label={t("Delete")}
				type='button'
				onClick={() => onHandleOpenDialog(project)}
			/>
		</td>}
	</tr>
};