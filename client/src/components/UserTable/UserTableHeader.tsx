import { useTranslation } from "react-i18next"

export const UserTableHeader = () => {
	const { t } = useTranslation()
	return <thead className="border-b border-gray-300 dark:border-gray-600">
		<tr className="text-black text-left">
			<th className="py-2">{t("Name")}</th>
			<th className="py-2">{t("Status")}</th>
			<th className="py-2">{t("UserCreatedAt")}</th>
		</tr>
	</thead>
}