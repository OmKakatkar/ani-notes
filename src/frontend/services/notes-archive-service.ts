import axios from 'axios';
import { toast } from 'react-toastify';
import { NoteType } from '../components/NoteCard/NoteCard';
import {
  API_DELETE_ARCHIVES,
  API_GET_ARCHIVES,
  API_POST_ARCHIVES,
  API_RESTORE_ARCHIVES,
} from '../constants/api-constant';

/**
 * Get archive notes
 */
export const getArchiveNotes = async (authToken: string) => {
  try {
    const { data } = await axios.get(API_GET_ARCHIVES, {
      headers: {
        authorization: authToken,
      },
    });
    return data.archives;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Add a note to archives
 */
export const addToArchives = async (note: NoteType, authToken: string) => {
  // export const addToArchives = async (note: NoteType, authToken: string) => {
  try {
    const { data } = await axios.post(
      `${API_POST_ARCHIVES}/${note._id}`,
      { note },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    toast.success('Note Archived');
    return { ...data };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Unarchive note
 */
export const restoreFromArchives = async (
  noteId: string,
  authToken: string
) => {
  try {
    const { data } = await axios.post(
      `${API_RESTORE_ARCHIVES}/${noteId}`,
      {},
      {
        headers: {
          authorization: authToken,
        },
      }
    );

    return { ...data };
  } catch (err) {
    console.error(err);
  }
};

/**
 * Delete note from archives
 * @param {string} noteId
 * @param {string} authToken
 * @return archives
 */
export const deleteFromArchives = async (noteId: string, authToken: string) => {
  try {
    const { data } = await axios.delete(`${API_DELETE_ARCHIVES}/${noteId}`, {
      headers: {
        authorization: authToken,
      },
    });
    toast.success('Moved to trash');
    console.log(data);
    return { ...data };
  } catch (err) {
    console.error(err);
  }
};
