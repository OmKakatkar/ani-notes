import { createContext, useContext, useEffect, useReducer } from "react";
import {
	ARCHIVES,
	CLOSE_NOTE_UPDATE_MODAL,
	NOTES,
	OPEN_NOTE_UPDATE_MODAL,
	TRASH,
	UPDATE_NOTE,
} from "../constants/reducer-constants";
import { useAuth } from "./auth-context";

const NotesContext = createContext();

const intialData = {
	showNoteUpdateModal: false,
	currentNote: {},
	notes: [],
	archives: [],
	trash: [],
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
		case ARCHIVES:
			return { ...state, archives: [...action.payload.archives] };
		case TRASH:
			return { ...state, trash: [...action.payload.trash] };
		default:
			return state;
	}
};

const NotesProvider = ({ children }) => {
	const { user } = useAuth();
	const [state, dispatch] = useReducer(reducer, intialData);
	const { notes, archives, trash, showNoteUpdateModal, currentNote } = state;

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
	};
	return (
		<NotesContext.Provider value={providerData}>
			{children}
		</NotesContext.Provider>
	);
};

const useNotes = () => useContext(NotesContext);

export { useNotes, NotesProvider };
