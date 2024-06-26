import { chartData } from "data/data"
import { useTranslation } from "react-i18next"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts"

export const Chart = ({ data }: any) => {
	const { t } = useTranslation()
	const translatedData = (data: any) => {
		return data.map((item: any) => {
			return {
				...item,
				name: t(item.name),
			}
		})
	}

	return <>
		<ResponsiveContainer
			width={"100%"}
			height={500}
		>
			<BarChart
				width={150}
				height={40}
				data={data ? translatedData(data) : chartData}
			>
				<XAxis dataKey={"name"} />
				<YAxis dataKey={"total"} />
				<Tooltip />
				<Legend />
				<CartesianGrid strokeDasharray={"3 3"} />
				<Bar dataKey={"total"} fill={"#8884d8"}
					label={{ value: t("total") }} />
			</BarChart>

		</ResponsiveContainer>
	</>
}