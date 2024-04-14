import { chartData } from "data/data"
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

export const Chart = () => {
	return <>
		<ResponsiveContainer
			width={"100%"}
			height={500}
		>
			<BarChart
				width={150}
				height={40}
				data={chartData}
			>
				<XAxis dataKey={"name"} />
				<YAxis dataKey={"total"} />
				<Tooltip />
				<Legend />
				<CartesianGrid strokeDasharray={"3 3"} />
				<Bar dataKey={"total"} fill={"#8884d8"} />
			</BarChart>

		</ResponsiveContainer>
	</>
}