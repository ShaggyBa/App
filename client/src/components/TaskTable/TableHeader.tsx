import { useTranslation } from "react-i18next"

export const TableHeader = () => {

	const { t } = useTranslation()

	return <thead className="border-b border-gray-300">
		<tr className="text-black text-left">
			<th className="py-2">{t("Name")}</th>
			<th className="py-2">{t("Priority")}</th>
			<th className="py-2">{t("Participants")}</th>
			<th className="py-2 hidden md:block">{t("CreatedAt")}</th>
		</tr>
	</thead>
}