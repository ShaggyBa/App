import { Link } from "react-router-dom";
import clsx from "clsx";
import { TLinkData } from "components/Sidebar";
import { setOpenSidebar } from "state/features/authSlice";
import { useDispatch } from "react-redux";

type Props = {
	currentPath: string
	linkData: TLinkData
}

export const NavLink = ({ currentPath, linkData }: Props) => {

	const dispatch = useDispatch()
	const closeSidebar = () => {
		dispatch(setOpenSidebar(false))
	}
	return (
		<Link
			to={linkData.link}
			onClick={closeSidebar}
			className={clsx(
				"w-full lg:w-5/6 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-red-200",
				currentPath === linkData.link.split("/")[0] ? "bg-red-600 text-white" : "")}
		>
			{linkData.icon}
			<span>{linkData.label}</span>
		</Link>
	)
}