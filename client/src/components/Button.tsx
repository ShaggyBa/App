import clsx from "clsx"

type Props = {
	type?: "button" | "submit" | "reset"
	label?: string
	className?: string
	icon?: any
	onClick?: () => void
}

const Button = (props: Props) => {


	return (
		<button
			type={props.type || "button"}
			className={clsx("px-3 py-2 outline-none", props.className)}
			onClick={props.onClick}

		>
			<span>{props.label}</span>
			{props.icon && props.icon}

		</button>
	)
}

export default Button