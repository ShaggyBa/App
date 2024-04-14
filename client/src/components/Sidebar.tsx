import {
    MdDashboard, MdOutlineAddTask,
    MdOutlinePendingActions, MdSettings,
    MdTaskAlt,
} from "react-icons/md";

import {FaTasks, FaTrashAlt, FaUsers} from "react-icons/fa";
import { useLocation} from "react-router-dom";
import {NavLink} from "components/NavLink";

export type TLinkData = {
    label: string,
    link: string,
    icon: JSX.Element
}

const linkData: TLinkData[] = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard/>,
    },
    {
        label: "Tasks",
        link: "tasks",
        icon: <FaTasks/>,
    },
    {
        label: "Completed",
        link: "completed/completed",
        icon: <MdTaskAlt/>,
    },
    {
        label: "In Progress",
        link: "in-progress/in progress",
        icon: <MdOutlinePendingActions/>,
    },
    {
        label: "To Do",
        link: "todo/todo",
        icon: <MdOutlinePendingActions/>,
    },
    {
        label: "Team",
        link: "team",
        icon: <FaUsers/>,
    },
    {
        label: "Trash",
        link: "trashed",
        icon: <FaTrashAlt/>,
    },
];

export const Sidebar = () => {

    // const {user} = useSelector((state: any) => state.auth)

    // const dispatch = useDispatch()
    const {pathname} = useLocation()
    const currentPath = pathname.split("/")[1]

	// After creating roles
    // const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5)

	const sidebarLinks = linkData

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
                    <NavLink  currentPath={currentPath} linkData={link} key={link.label} />
                ))}
            </div>

            <div className=''>
                <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
                    <MdSettings />
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
};
