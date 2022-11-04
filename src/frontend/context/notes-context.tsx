import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  ARCHIVES,
  ARCHIVE_NOTE,
  CLOSE_NOTE_UPDATE_MODAL,
  FILTER_PRIORITY,
  FILTER_TAG,
  NOTES,
  OPEN_NOTE_CREATE_MODAL,
  OPEN_NOTE_UPDATE_MODAL,
  PRIORITY_ALL,
  RESTORE_NOTE,
  SORT_DATE,
  TOGGLE_LOADING,
  TRASH,
  TRASH_NOTE,
  UNARCHIVE_NOTE,
  UPDATE_NOTE,
} from '../constants/reducer-constants';
import { NoteType } from '../services/auth-service';
import { useAuth } from './auth-context';

type NotesState = {
  isLoading: boolean;
  showNoteModal: boolean;
  currentNote: NoteType;
  notes: NoteType[];
  archives: NoteType[];
  trash: NoteType[];
  filters: {
    priority: string;
    tags: string[];
    dateTime: string;
  };
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type NotesActionPayload = {
  [TOGGLE_LOADING]: undefined;
  [OPEN_NOTE_CREATE_MODAL]: undefined;
  [OPEN_NOTE_UPDATE_MODAL]: { currentNote: NoteType };
  [CLOSE_NOTE_UPDATE_MODAL]: undefined;
  [UPDATE_NOTE]: { notes: NoteType[] };
  [NOTES]: { notes: NoteType[] };
  [ARCHIVE_NOTE]: { notes: NoteType[]; archives: NoteType[] };
  [UNARCHIVE_NOTE]: { notes: NoteType[]; archives: NoteType[] };
  [ARCHIVES]: { archives: NoteType[] };
  [RESTORE_NOTE]: { notes: NoteType[]; trash: NoteType[] };
  [TRASH_NOTE]: { notes: NoteType[]; trash: NoteType[] };
  [TRASH]: { trash: NoteType[] };
  [FILTER_PRIORITY]: { filters: { priority: string } };
  [FILTER_TAG]: { tag: string };
  [SORT_DATE]: string;
};

type NotesAction =
  ActionMap<NotesActionPayload>[keyof ActionMap<NotesActionPayload>];

type NotesContextType = NotesState & { dispatch: React.Dispatch<NotesAction> };

const initialNoteData = {
  title: '',
  description: '',
  noteColor: '#a0a0a0',
  priority: 'low',
  tags: [] as string[],
  createdAt: '',
  updatedAt: '',
};

const initialData = {
  isLoading: false,
  showNoteModal: false,
  currentNote: initialNoteData,
  notes: [] as NoteType[],
  archives: [] as NoteType[],
  trash: [] as NoteType[],
  filters: {
    priority: PRIORITY_ALL,
    tags: [] as string[],
    dateTime: '',
  },
};

const NotesContext = createContext({} as NotesContextType);

const addTag = (tagArray: string[], tag: string) => {
  return [...tagArray, tag];
};

const removeTag = (tagArray: string[], tag: string) => {
  return tagArray.filter((currTag) => currTag !== tag);
};

const reducer = (state: NotesState, action: NotesAction) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case OPEN_NOTE_CREATE_MODAL:
      return {
        ...state,
        showNoteModal: true,
        currentNote: initialNoteData,
      };
    case OPEN_NOTE_UPDATE_MODAL:
      return {
        ...state,
        showNoteModal: true,
        currentNote: action.payload.currentNote,
      };
    case CLOSE_NOTE_UPDATE_MODAL:
      return {
        ...state,
        showNoteModal: false,
        currentNote: initialNoteData,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        showNoteModal: false,
        notes: [...action.payload.notes],
      };
    case NOTES:
      return { ...state, notes: [...action.payload.notes] };
    case ARCHIVE_NOTE:
      return {
        ...state,
        notes: [...action.payload.notes],
        archives: [...action.payload.archives],
      };
    case UNARCHIVE_NOTE:
      return {
        ...state,
        notes: [...action.payload.notes],
        archives: [...action.payload.archives],
      };
    case ARCHIVES:
      return { ...state, archives: [...action.payload.archives] };
    case RESTORE_NOTE:
      return {
        ...state,
        notes: [...action.payload.notes],
        trash: [...action.payload.trash],
      };
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
      if (state.filters.tags.includes(action.payload.tag)) {
        return {
          ...state,
          filters: {
            ...state.filters,
            tags: removeTag(state.filters.tags, action.payload.tag),
          },
        };
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          tags: addTag(state.filters.tags, action.payload.tag),
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

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialData);
  const {
    notes,
    archives,
    trash,
    showNoteModal,
    currentNote,
    filters,
    isLoading,
  } = state;

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
    showNoteModal,
    currentNote,
    filters,
    isLoading,
  };
  return (
    <NotesContext.Provider value={providerData}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { useNotes, NotesProvider };
