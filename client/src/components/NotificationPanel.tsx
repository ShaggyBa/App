import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetNotificationsQuery, useMarkNotificationReadMutation } from "state/api/notification";
import { ViewNotification } from "./ViewNotification";
import { useSelector } from "react-redux";


type TIcon = {
	[key: string]: JSX.Element;
}

const ICONS: TIcon = {
	alert: (
		<HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-red-600' />
	),
	message: (
		<BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-red-600' />
	),
};

export const NotificationPanel = () => {
	const { user } = useSelector((state: any) => state.auth)
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(null);

	const [notifications, setNotifications] = useState([])

	const { data, refetch } = useGetNotificationsQuery(user._id);

	const [markRead] = useMarkNotificationReadMutation();

	const viewHandler = async (el: any) => {
		setSelected(el);
		readHandler("one", el._id);
		setOpen(true);
	};


	const readHandler = async (type: string, id?: string,) => {

		await markRead({ id, type }).unwrap();

		refetch()
	};

	const callsToAction = [
		{
			name: "Cancel",
			href: "#",
			icon: "",
		},
		{
			name: "Mark All Read",
			href: "#",
			icon: "",
			onClick: () => readHandler("all", ""),
		},
	]

	useEffect(() => {
		if (data) {
			setNotifications(data)
		}
	}, [data])


	return (
		<>
			<Popover className='relative'>
				<Popover.Button className='inline-flex items-center outline-none'>
					<div className='w-8 h-8 flex items-center justify-center text-gray-800 relative'>
						<IoIosNotificationsOutline size={35} />
						{notifications?.length > 0 && (
							<span className='absolute text-center top-0 right-1 text-[12px] text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
								{notifications?.length}
							</span>
						)}
					</div>
				</Popover.Button>

				<Transition
					as={Fragment}
					enter='transition ease-out duration-200'
					enterFrom='opacity-0 translate-y-1'
					enterTo='opacity-100 translate-y-0'
					leave='transition ease-in duration-150'
					leaveFrom='opacity-100 translate-y-0'
					leaveTo='opacity-0 translate-y-1'
				>
					<Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max  px-4'>
						{notifications?.length > 0 ?
							({ close }): JSX.Element =>
							(
								<div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
									<div className='p-4'>
										{notifications?.slice(0, 5).map((item: any, index) => (
											<div
												key={item._id + index}
												className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
											>
												<div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-transparent shrink-0'>
													{ICONS[item.notiType || "alert"]}
												</div>

												<div
													className='cursor-pointer'
													onClick={() => viewHandler(item)}
												>
													<div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
														<p> {item.notiType}</p>
														<span className='text-xs font-normal lowercase'>
															{moment(item.createdAt).fromNow()}
														</span>
													</div>
													<p className='line-clamp-1 mt-1 text-gray-600'>
														{item.text}
													</p>
												</div>
											</div>
										))}
									</div>

									<div className='grid grid-cols-2 divide-x bg-gray-50'>
										{callsToAction.map((item) => (
											<Link
												to={"/"}
												key={item.name}
												onClick={
													item?.onClick ? () => item.onClick() : () => close()
												}
												className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-600 hover:bg-gray-100'
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							)
							: null
						}
					</Popover.Panel>
				</Transition>
			</Popover>

			<ViewNotification open={open} setOpen={setOpen} el={selected} />
		</>
	);
};
