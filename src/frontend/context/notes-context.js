import { createContext, useContext, useEffect, useReducer } from "react";
import { ARCHIVES, NOTES, TRASH } from "../constants/reducer-constants";
import { useAuth } from "./auth-context";

const NotesContext = createContext();

const intialData = {
	notes: [],
	archives: [],
	trash: [],
};

const reducer = (state, action) => {
	switch (action.type) {
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
	const { notes, archives, trash } = state;
	useEffect(() => {
		if (user.token) {
			dispatch({ type: NOTES, payload: { notes: user.user.notes } });
			dispatch({ type: ARCHIVES, payload: { archives: user.user.archives } });
			dispatch({ type: TRASH, payload: { trash: user.user.trash } });
		}
	}, [user]);
	console.log(state);
	const providerData = { dispatch, notes, archives, trash };
	return (
		<NotesContext.Provider value={providerData}>
			{children}
		</NotesContext.Provider>
	);
};

const useNotes = () => useContext(NotesContext);

export { useNotes, NotesProvider };
