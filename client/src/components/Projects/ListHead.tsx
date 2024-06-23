import { useTranslation } from "react-i18next";

export const ListHead = () => {

	const { t } = useTranslation()

	return (
		<thead className='border-b border-gray-300'>
			<tr className='text-black  text-left'>
				<th className='py-2'>{t("Title")}</th>
				<th className='py-2'>{t("Participants")}</th>
				<th className='py-2'>{t("DateCreated")}</th>
			</tr>
		</thead>
	)
};