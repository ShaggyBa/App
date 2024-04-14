import { Dialog } from "@headlessui/react"
import { ModalWrapper } from "components/ModalWrapper"
import { Textbox } from "components/TextBox"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { TeamList } from "./TeamList"
import { SelectList } from "./SelectList"
import Button from "components/Button"
import { BiImages } from "react-icons/bi"
import { ITask } from "types/task.types"


const LISTS: string[] = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY: string[] = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs: string[] = [];


export const AddTask = ({ open, setOpen, task }: { open: boolean, setOpen: any, task?: ITask }) => {


	const { register, handleSubmit, formState: { errors } } = useForm()

	const [team, setTeam] = useState(task?.team || [])

	const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0])

	const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2])

	const [assets, setAssets] = useState<File[]>([]);

	const [uploading, setUploading] = useState(false)

	const submitHandler = () => { }

	const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		setAssets(files ? Array.from(files) : []);
	};

	return <ModalWrapper open={open} setOpen={setOpen}>
		<form onSubmit={handleSubmit(submitHandler)}>
			<Dialog.Title
				as="h2"
				className={"text-base font-bold leading-6 text-gray-900 mb-4"}
			>
				{task ? "Update task" : "Add task"}
			</Dialog.Title>

			<div className="mt-2 flex flex-col gap-6">
				<Textbox
					placeholder="Task title"
					type="text"
					name="title"
					label="Task title"
					className="w-full rounded"
					register={register("title", { required: "Title is required" })}
					error={errors.title ? errors.title.message : ""}
				/>

				<TeamList
					setTeam={setTeam}
					team={team}
				/>

				<div className="flex gap-4">
					<SelectList
						label="Task stage"
						lists={LISTS}
						selected={stage}
						setSelected={setStage}
					/>

					<div className="w-full">
						<Textbox
							placeholder="Date"
							type="date"
							name="date"
							label="Task date"
							className="w-full rounded"
							register={register("date", { required: "Date is required" })}
							error={errors.date ? errors.date.message : ""}
						/>
					</div>
				</div>

				<div className='flex gap-4'>
					<SelectList
						label='Priority Level'
						lists={PRIORITY}
						selected={priority}
						setSelected={setPriority}
					/>

					<div className='w-full flex items-center justify-center mt-4'>
						<label
							className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
							htmlFor='imgUpload'
						>
							<input
								type='file'
								className='hidden'
								id='imgUpload'
								onChange={(e) => handleSelect(e)}
								accept='.jpg, .png, .jpeg'
								multiple={true}
							/>
							<BiImages />
							<span>Add Assets</span>
						</label>
					</div>
				</div>

				<div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
					{uploading ? (
						<span className='text-sm py-2 text-red-500'>
							Uploading assets
						</span>
					) : (
						<Button
							label='Submit'
							type='submit'
							className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
						/>
					)}

					<Button
						type='button'
						className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
						onClick={() => setOpen(false)}
						label='Cancel'
					/>
				</div>

			</div>
		</form>
	</ModalWrapper>
}