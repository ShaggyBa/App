import React from 'react'

import clsx from 'clsx'

type Props = {
	placeholder?: string
	type: string
	name: string
	label?: string
	value?: string,
	onInput?: (value: string) => void
	className?: string
	register: any
	error: string | undefined
}

const FormField = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
	return (
		<div className='w-full flex flex-col gap-1'>
			<label className='text-slate-800'>
				{props.label}
				<input
					type={props.type}
					name={props.name}
					placeholder={props.placeholder}
					value={props.value}
					onInput={(e) => props.onInput && props.onInput(e.currentTarget.value)}
					ref={ref}
					{...props.register}
					aria-invalid={props.error ? "true" : "false"}
					className={clsx(
						`
						bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300
						 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300
						 `,
						props.className,
						props.label ? "mt-2.5" : "")}
				/>
			</label>
			{props.error && (<span className='text-xs text-[#f64949fe] mt-0.5'>{props.error}</span>)}
		</div>
	)
})

export default FormField