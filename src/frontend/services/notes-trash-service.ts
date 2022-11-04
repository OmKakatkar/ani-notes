import axios from 'axios';
import { toast } from 'react-toastify';
import {
  API_DELETE_TRASH,
  API_GET_TRASH,
  API_POST_TRASH,
  API_RESTORE_TRASH,
} from '../constants/api-constant';

/**
 * Get trashed notes
 */
export const getTrashNotes = async (authToken: string) => {
  try {
    const { data } = await axios.get(API_GET_TRASH, {
      headers: {
        authorization: authToken,
      },
    });
    return data.trash;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Add a note to trash
 */
export const addToTrash = async (noteId: string, authToken: string) => {
  try {
    const { data } = await axios.post(
      `${API_POST_TRASH}/${noteId}`,
      {},
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    toast.success('Moved to trash');
    return { ...data };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Restore note from trash
 */
export const restoreFromTrash = async (noteId: string, authToken: string) => {
  try {
    const { data } = await axios.post(
      `${API_RESTORE_TRASH}/${noteId}`,
      {},
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    toast.success('Note Restored');
    return { ...data };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Delete note from trash
 */
export const deleteFromTrash = async (noteId: string, authToken: string) => {
  try {
    const { data } = await axios.delete(`${API_DELETE_TRASH}/${noteId}`, {
      headers: {
        authorization: authToken,
      },
    });
    toast.success('Note Deleted');
    return { ...data };
  } catch (error) {
    console.error(error);
  }
};
