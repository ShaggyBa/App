import { useTranslation } from "react-i18next";

export const ListHead = () => {

	const { t } = useTranslation()

	return (
		<thead className='w-full border-b border-gray-300'>
			<tr className='w-full text-black  text-left'>
				<th className='py-2'>{t("Title")}</th>
				<th className='py-2'>{t("Priority")}</th>
				<th className='py-2 line-clamp-1'>{t("CreatedAt")}</th>
				<th className='py-2'>{t("Assets")}</th>
				<th className='py-2'>{t("Team")}</th>
			</tr>
		</thead>
	)
};
