import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import clsx from "clsx";
import { Sidebar } from "components/Sidebar";
import { setOpenSidebar } from "state/features/authSlice";
import { FaArrowLeft } from "react-icons/fa";

export const MobileSidebar = () => {

	const { isSidebarOpen } = useSelector((state: any) => state.auth)

	const mobileMenuRef = useRef<HTMLDivElement | null>(null)

	const dispatch = useDispatch()

	const closeSidebar = () => {
		dispatch(setOpenSidebar(false))
	}

	return (
		<>
			<Transition
				show={isSidebarOpen}
				as={Fragment}
				enter='transition-opacity ease-in-out duration-700'
				enterFrom="-translate-x-full opacity-0"
				enterTo="translate-x-0 opacity-100"
				leave="transition ease-in-out"
				leaveFrom="translate-x-0 opacity-100"
				leaveTo="-translate-x-full opacity-0"
			>
				{() => (
					<div
						ref={(node) => (mobileMenuRef.current = node)}
						className={clsx(
							"md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
							isSidebarOpen ? "translate-x-0" : "translate-x-full"
						)}
						onClick={() => closeSidebar()}
					>
						<div className='bg-white w-3/4 h-full'>
							<div className='w-full flex justify-end p-5'>
								<button
									onClick={() => closeSidebar()}
									className='flex justify-end items-end'
								>
									<FaArrowLeft />
								</button>
							</div>

							<div className='mt-5'>
								<Sidebar />
							</div>
						</div>
					</div>
				)}
			</Transition>
		</>
	);
};

