import axios from 'axios';
import { toast } from 'react-toastify';
import { NoteType } from '../components/NoteCard/NoteCard';
import { API_NOTES } from '../constants/api-constant';

/**
 * Create new note
 */
export const createNote = async (note: NoteType, authToken: string) => {
  try {
    const { data } = await axios.post(
      API_NOTES,
      {
        note,
      },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    toast.success('New Note Created!');
    return data.notes;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get all notes
 */
export const getAllNotes = async (authToken: string) => {
  try {
    const { data } = await axios.get(API_NOTES, {
      headers: {
        authorization: authToken,
      },
    });
    return data.notes;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Updates an existing note
 */
export const updateNote = async (note: NoteType, authToken: string) => {
  try {
    const { data } = await axios.post(
      `${API_NOTES}/${note._id}`,
      {
        note,
      },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    toast.success('Note Updated!');
    return data.notes;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Delete note permanantly
 */
export const deleteNotePermanent = async (
  noteId: NoteType,
  authToken: string
) => {
  try {
    const { data } = await axios.delete(`${API_NOTES}/${noteId}`, {
      headers: {
        authorization: authToken,
      },
    });
    toast.success('Note Deleted!');
    return data.notes;
  } catch (error) {
    console.error(error);
  }
};
