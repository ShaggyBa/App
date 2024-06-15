import { Tab } from "@headlessui/react"

type TTabs = {
	title: string,
	icon: JSX.Element
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export const Tabs = ({ tabs, setSelected, selectedView, children }: { tabs: TTabs[], setSelected: any, selectedView: number, children?: JSX.Element | JSX.Element[] }) => {
	return <div className="w-full px-1 sm:px-0">
		<Tab.Group>
			<Tab.List className={"flex space-x-6 rounded-xl p-1"}>
				{tabs.map((tab, index) => (
					<Tab
						key={index + tab.title}
						onClick={() => setSelected(index)}
						className={({ selected }) => {
							return classNames("w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",
								selected && (index === selectedView)
									? "text-red-600 border-b-2 border-red-600"
									: "text-gray-800 hover:text-red-800"
							)
						}}
					>
						{tab.icon}
						<span>{tab.title}</span>
					</Tab>
				))}
			</Tab.List>
			<Tab.Panels className={"w-full mt-2"}>
				{children}
			</Tab.Panels>
		</Tab.Group>
	</div>
}