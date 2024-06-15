import { useTranslation } from "react-i18next";

export const ListHead = () => {

	const { t } = useTranslation()

	return (
		<thead className='border-b border-gray-300'>
			<tr className='text-black text-left'>
				<th className='py-2'>{t("FullName")}</th>
				<th className='py-2'>{t("UserTitle")}</th>
				<th className='py-2'>{t("Email")}</th>
				<th className='py-2'>{t("Role")}</th>
				<th className='py-2'>{t("Active")}</th>

			</tr>
		</thead>
	)
};