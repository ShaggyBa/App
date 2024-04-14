import { IUserTableInfo } from "types/user.types"
import { UserTableHeader } from "./UserTableHeader"
import { UserTableRow } from "./UserTableRow"

export const UserTable = ({ users }: { users: IUserTableInfo[] }) => {
	return <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
		<table className="w-full mb-5">
			<UserTableHeader />
			<tbody>
				{
					users.map((user, index: number) => <UserTableRow user={user} key={index} />)
				}
			</tbody>
		</table>
	</div>
}