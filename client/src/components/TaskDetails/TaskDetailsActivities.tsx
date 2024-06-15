import Button from "components/Button";
import { Loader } from "components/Loader";
import { useState } from "react";
import { TaskDetailsCard } from "./TaskDetailsCard";
import { usePostTaskActivityMutation } from "state/api/tasks";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";


const act_types: string[] = [
	"Started",
	"Completed",
	"In Progress",
	"Commented",
	"Bug",
	"Assigned",
];

export const TaskDetailsActivities = ({ activity, id, refetch }: { activity: any; id: string, refetch: any }) => {
	const [selected, setSelected] = useState(act_types[0]);
	const [text, setText] = useState("");
	const isLoading = false;
	const [postTaskActivity] = usePostTaskActivityMutation()

	const { t } = useTranslation()

	const handleSubmit = async () => {
		try {
			const activityData = {
				type: selected?.toLowerCase(),
				activity: text

			}
			const res = await postTaskActivity({ data: activityData, id }).unwrap();

			setText("");
			toast.success("Activity added: " + res.message);
			refetch()
		} catch (err) {
			toast.error(t("SomethingWentWrong") + err);
		}
	};

	return (
		<div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
			<div className='w-full md:w-1/2'>
				<h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>

				<div className='w-full'>
					{activity?.map((el: any, index: number) => (
						<TaskDetailsCard
							key={index}
							item={el}

						/>
					))}
				</div>
			</div>

			<div className='w-full md:w-1/3'>
				<h4 className='text-gray-600 font-semibold text-lg mb-5'>
					Add Activity
				</h4>
				<div className='w-full flex flex-wrap gap-5'>
					{act_types.map((item) => (
						<div key={item} className='flex gap-2 items-center'>
							<input
								type='checkbox'
								className='w-4 h-4'
								checked={selected === item ? true : false}
								onChange={() => setSelected(item)}
							/>
							<p>{item}</p>
						</div>
					))}
					<textarea
						rows={10}
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder='Type ......'
						className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
					></textarea>
					{isLoading ? (
						<Loader />
					) : (
						<Button
							type='button'
							label='Submit'
							onClick={handleSubmit}
							className='bg-blue-600 text-white rounded'
						/>
					)}
				</div>
			</div>
		</div>
	);
};