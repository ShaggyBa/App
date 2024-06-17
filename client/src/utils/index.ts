import i18next from "i18next";
import { ITask, TPriority, TStage } from "types/task.types";

export const formatDate = (date: Date) => {
	// Get the month, day, and year
	const month = date.toLocaleString("ru-RU", { month: "short" });
	const day = date.getDate();
	const year = date.getFullYear();

	const formattedDate = `${day}-${month}-${year}`;

	return formattedDate;
};

export function dateFormatter(dateString: string | Date) {
	const inputDate: Date = new Date(dateString);

	if (!(inputDate)) {
		return "Некорректная дата";
	}

	const year = inputDate.getFullYear();
	const month = String(inputDate.getMonth() + 1).padStart(2, "0");
	const day = String(inputDate.getDate()).padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

export function getInitials(fullName: string) {
	if (!fullName) {
		return "U";
	}
	const names = fullName.trim().split(" ");

	if (names.length === 1) return names[0][0].toUpperCase();

	const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

	const initialsStr = initials.join("");

	return initialsStr;
}

export const PRIORITY_STYLES: TPriority = {
	high: "text-red-600",
	medium: "text-yellow-600",
	low: "text-blue-600",
};

export const TASK_TYPE: TStage = {
	todo: "bg-red-600",
	"in progress": "bg-yellow-600",
	completed: "bg-green-600",
};

export const BGS = [
	"bg-blue-600",
	"bg-yellow-600",
	"bg-red-600",
	"bg-green-600",
];

export const localeMomentData = (data: string, t: any) => {
	if (data.split("months ago").length > 1) {
		return `${data.split("months ago")[0]} ${t("monthsAgo")}`
	}
	else if (data.split("a month ago").length > 1) {
		return `${data.split("a month ago")[0]} ${t("monthAgo")}`
	}
	else if (data.split("days ago").length > 1) {
		return `${data.split("days ago")[0]} ${t("daysAgo")}`
	}
	else if (data.split("a day ago").length > 1) {
		return `${data.split("a day ago")[0]} ${t("dayAgo")}`
	}
	else if (data.split("hours ago").length > 1) {
		return `${data.split("hours ago")[0]} ${t("hoursAgo")}`
	}

	return data
}

export const translatedTaskData = (task: ITask, t: any) => {

	return {
		...task,
		priority: t(task.priority) || task.priority,
	}
}

export const translatedData = (data: string | string[], lang?: string) => {

	if (typeof data === "string") {
		const tData = i18next.t(data, { lng: lang ? lang : i18next.language })
		return tData
	}

	return data.map((el: string) => {
		const tData = i18next.t(el, { lng: lang ? lang : i18next.language })
		return tData
	})
}