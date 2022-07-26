import dayjs from "dayjs";
import {
	DATE_LATEST,
	DATE_OLDEST,
	PRIORITY_HIGH,
	PRIORITY_LOW,
	PRIORITY_MEDIUM,
	PRIORITY_NONE,
} from "../constants/reducer-constants";

const filterByPriority = (notes, priority) => {
	switch (priority) {
		case PRIORITY_HIGH:
			return notes.filter((note) => note.priority === "high");
		case PRIORITY_MEDIUM:
			return notes.filter((note) => note.priority === "medium");
		case PRIORITY_LOW:
			return notes.filter((note) => note.priority === "low");
		case PRIORITY_NONE:
			return notes;
		default:
			return notes;
	}
};

const filterByTag = (notes, filterTags) => {
	if (filterTags.length) {
		return notes.filter(({ tags }) =>
			tags.some((tag) => filterTags.includes(tag))
		);
	}
	return notes;
};

const sortByDate = (notes, dateTime) => {
	switch (dateTime) {
		case DATE_OLDEST:
			return [...notes].sort((a, b) => dayjs(a.updatedAt) - dayjs(b.updatedAt));
		case DATE_LATEST:
			return [...notes].sort((a, b) => dayjs(b.updatedAt) - dayjs(a.updatedAt));
		default:
			return notes;
	}
};

const searchNotes = (notes, search) => {
	if (search) {
		return notes.filter(({ title }) =>
			title.toLowerCase().includes(search.toLowerCase())
		);
	}
	return notes;
};

export const getFilteredNotes = (notes, filters) => {
	const searchedNotes = searchNotes(notes, filters.search);
	const priorityFiltered = filterByPriority(searchedNotes, filters.priority);
	const tagFiltered = filterByTag(priorityFiltered, filters.tags);
	const dateSorted = sortByDate(tagFiltered, filters.dateTime);
	return dateSorted;
};
