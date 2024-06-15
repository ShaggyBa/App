import clsx from "clsx"
import moment from "moment"
import 'moment/locale/ru'
import { useTranslation } from "react-i18next"
import { IUserTableInfo } from "types/user.types"
import { getInitials, localeMomentData } from "utils/index"

export const UserTableRow = ({ user }: { user: IUserTableInfo }) => {

	const { t } = useTranslation()

	return <tr className="border-b border-gray-200 text-gray-600">
		<td className="py-2">
			<div className="flex items-center gap-3">
				<div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
					<span className="text-center">
						{getInitials(user?.name)}
					</span>
				</div>
				<div>
					<p>{user.name}</p>
					<span className="text-xs text-black">{user?.role}</span>
				</div>
			</div>
		</td>
		<td className="py-2">
			<p className={clsx("w-fit px-2 py-1 rounded-full text-xs", user?.isActive ? "bg-green-200" : "bg-yellow-100")}>
				{user?.isActive ? t("Active") : t("Inactive")}
			</p>
		</td>
		<td className="py-2 text-sm">
			{localeMomentData(moment(user?.createdAt).fromNow(), t)}
		</td>
	</tr>
}