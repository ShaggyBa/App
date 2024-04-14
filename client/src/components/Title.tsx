import clsx from "clsx"

export const Title = ({ title, className }: { title: string, className?: string }) => {
	return <h2 className={clsx("text-2xl font-semibold capitalize", className || "")}>{title}</h2>
}