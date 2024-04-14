import { Sidebar } from 'components/Sidebar'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Navbar } from "components/Navbar";
import { MobileSidebar } from "components/MobileSidebar";

function Layout() {
	const { user } = useSelector((state: any) => state.auth);

	// const { testId } = useSelector((state: any) => state.auth)

	const location = useLocation()


	return user ? (
		<div className='w-full h-screen flex flex-col md:flex-row'>
			<div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
				<Sidebar />
			</div>

			<MobileSidebar />

			<div className='flex-1 overflow-y-auto'>
				<Navbar />

				<div className='p-4 2xl:px-10'>
					<Outlet />
				</div>
			</div>
		</div>
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
}

export default Layout