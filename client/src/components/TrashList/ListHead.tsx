import { useTranslation } from "react-i18next";

export const ListHead = () => {

	const { t } = useTranslation()

	return (
		<thead className='border-b border-gray-300'>
			<tr className='text-black  text-left'>
				<th className='py-2'>{t("Title")}</th>
				<th className='py-2'>{t("Priority")}</th>
				<th className='py-2'>{t("Stage")}</th>
				<th className='py-2 line-clamp-1'>{t("ModifiedOn")}</th>
			</tr>
		</thead>
	)
};