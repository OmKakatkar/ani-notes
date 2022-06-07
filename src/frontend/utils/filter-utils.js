import {
	PRIORITY_HIGH,
	PRIORITY_LOW,
	PRIORITY_MEDIUM,
} from "../constants/reducer-constants";

const filterByPriority = (notes, priority) => {
	switch (priority) {
		case PRIORITY_HIGH:
			return notes.filter((note) => note.priority === "high");
		case PRIORITY_MEDIUM:
			return notes.filter((note) => note.priority === "medium");
		case PRIORITY_LOW:
			return notes.filter((note) => note.priority === "low");
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

export const getFilteredNotes = (notes, filters) => {
	const priorityFiltered = filterByPriority(notes, filters.priority);
	const tagFiltered = filterByTag(priorityFiltered, filters.tags);
	return tagFiltered;
};
