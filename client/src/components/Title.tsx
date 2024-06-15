import clsx from "clsx"

export const Title = ({ title, className }: { title: string, className?: string }) => {
	return <h2 className={clsx("text-2xl font-semibold", className || "")}>{title}</h2>
}