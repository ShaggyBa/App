import {
	MdDashboard, MdList, MdOutlineAddTask,
	MdOutlinePendingActions, MdSettings,
	MdTaskAlt,
} from "react-icons/md";

import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { NavLink } from "components/NavLink";
import { useSelector } from "react-redux";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export type TLinkData = {
	label: string,
	link: string,
	icon: JSX.Element
}


export const Sidebar = () => {

	const { t } = useTranslation()

	const linkData: TLinkData[] = [
		{
			label: t("Projects"),
			link: "projects",
			icon: <MdList />
		},

		{
			label: t("Dashboard"),
			link: "dashboard",
			icon: <MdDashboard />,
		},
		{
			label: t("Tasks"),
			link: "tasks",
			icon: <FaTasks />,
		},
		{
			label: t("Completed"),
			link: "completed/completed",
			icon: <MdTaskAlt />,
		},
		{
			label: t("InProgress"),
			link: "in-progress/in progress",
			icon: <MdOutlinePendingActions />,
		},
		{
			label: t("Todo"),
			link: "todo/todo",
			icon: <MdOutlinePendingActions />,
		},
		{
			label: t("Team"),
			link: "team",
			icon: <FaUsers />,
		},
		{
			label: t("Trash"),
			link: "trashed",
			icon: <FaTrashAlt />,
		},
	];

	const { user } = useSelector((state: any) => state.auth)

	// const dispatch = useDispatch()
	const { pathname } = useLocation()
	const currentPath = pathname.split("/")[1]

	// After creating roles
	const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 6)

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	}


	return (
		<div className='w-full  h-full flex flex-col gap-6 p-5'>
			<h1 className='flex gap-1 items-center'>
				<p className='bg-red-600 p-2 rounded-full'>
					<MdOutlineAddTask className='text-white text-2xl font-black' />
				</p>
				<span className='text-2xl font-bold text-black'>Tasker</span>
			</h1>

			<div className='flex-1 flex flex-col gap-y-5 py-8'>
				{sidebarLinks.map((link) => (
					<NavLink currentPath={currentPath} linkData={link} key={link.label} />
				))}
			</div>

			<div className=''>
				<button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
					<MdSettings />
					<span>{t('Settings')}</span>

				</button>
				<button className={`px-2 border-[1px] rounded-lg ${i18n.language === 'ru' ? 'bg-red-600 text-white' : ''}`}
					onClick={() => changeLanguage('ru')}>ru</button>
				<button className={`px-2 border-[1px] rounded-lg ${i18n.language === 'en' ? 'bg-red-600 text-white' : ''}`}
					onClick={() => changeLanguage('en')}>en</button>
			</div>
		</div>
	);
};
