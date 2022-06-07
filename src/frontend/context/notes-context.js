import { createContext, useContext, useEffect, useReducer } from "react";
import {
	ARCHIVES,
	ARCHIVE_NOTE,
	CLOSE_NOTE_UPDATE_MODAL,
	DATE_LATEST,
	FILTER_PRIORITY,
	FILTER_TAG,
	NOTES,
	OPEN_NOTE_UPDATE_MODAL,
	PRIORITY_NONE,
	RESTORE_NOTE,
	SORT_DATE,
	TRASH,
	TRASH_NOTE,
	UNARCHIVE_NOTE,
	UPDATE_NOTE,
} from "../constants/reducer-constants";
import { useAuth } from "./auth-context";

const NotesContext = createContext();

const addTag = (tagArray, tag) => {
	return [...tagArray, tag];
};

const removeTag = (tagArray, tag) => {
	return tagArray.filter((currTag) => currTag !== tag);
};

const intialData = {
	showNoteUpdateModal: false,
	currentNote: {},
	notes: [],
	archives: [],
	trash: [],
	filters: {
		priority: PRIORITY_NONE,
		tags: [],
		dateTime: DATE_LATEST,
	},
};

const reducer = (state, action) => {
	switch (action.type) {
		case OPEN_NOTE_UPDATE_MODAL:
			return {
				...state,
				showNoteUpdateModal: true,
				currentNote: action.payload.currentNote,
			};
		case CLOSE_NOTE_UPDATE_MODAL:
			return { ...state, showNoteUpdateModal: false, currentNote: {} };
		case UPDATE_NOTE:
			return {
				...state,
				showNoteUpdateModal: false,
				notes: [...action.payload.notes],
			};
		case NOTES:
			return { ...state, notes: [...action.payload.notes] };
		case ARCHIVE_NOTE:
		case UNARCHIVE_NOTE:
			return {
				...state,
				notes: [...action.payload.notes],
				archives: [...action.payload.archives],
			};
		case ARCHIVES:
			return { ...state, archives: [...action.payload.archives] };
		case RESTORE_NOTE:
		case TRASH_NOTE:
			return {
				...state,
				notes: [...action.payload.notes],
				trash: [...action.payload.trash],
			};
		case TRASH:
			return { ...state, trash: [...action.payload.trash] };
		case FILTER_PRIORITY:
			return {
				...state,
				filters: {
					...state.filters,
					priority: action.payload.filters.priority,
				},
			};
		case FILTER_TAG:
			if (state.filters.tags.includes(action.payload)) {
				return {
					...state,
					filters: {
						...state.filters,
						tags: removeTag(state.filters.tags, action.payload),
					},
				};
			}
			return {
				...state,
				filters: {
					...state.filters,
					tags: addTag(state.filters.tags, action.payload),
				},
			};
		case SORT_DATE:
			return {
				...state,
				filters: {
					...state.filters,
					dateTime: action.payload,
				},
			};
		default:
			return state;
	}
};

const NotesProvider = ({ children }) => {
	const { user } = useAuth();
	const [state, dispatch] = useReducer(reducer, intialData);
	const { notes, archives, trash, showNoteUpdateModal, currentNote, filters } =
		state;

	useEffect(() => {
		if (user.token) {
			dispatch({ type: NOTES, payload: { notes: user.user.notes } });
			dispatch({ type: ARCHIVES, payload: { archives: user.user.archives } });
			dispatch({ type: TRASH, payload: { trash: user.user.trash } });
		}
	}, [user]);

	const providerData = {
		dispatch,
		notes,
		archives,
		trash,
		showNoteUpdateModal,
		currentNote,
		filters,
	};
	return (
		<NotesContext.Provider value={providerData}>
			{children}
		</NotesContext.Provider>
	);
};

const useNotes = () => useContext(NotesContext);

export { useNotes, NotesProvider };
