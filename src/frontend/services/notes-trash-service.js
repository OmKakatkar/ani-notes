import axios from "axios";
import {
	API_DELETE_TRASH,
	API_GET_TRASH,
	API_POST_TRASH,
	API_RESTORE_TRASH,
} from "../constants/api-constant";
import { success } from "../constants/toast-constants";
import { notify } from "../utils/notify";

/**
 * Get trashed notes
 * @param {string} authToken
 * @return trash
 */
export const getTrashNotes = async (authToken) => {
	try {
		const { data } = await axios.get(API_GET_TRASH, {
			headers: {
				authorization: authToken,
			},
		});
		return data.trash;
	} catch (err) {
		console.error(err);
	}
};

/**
 * Add a note to trash
 * @param {string} noteId
 * @param {string} authToken
 * @return notes, trash
 */
export const addToTrash = async (noteId, authToken) => {
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
		notify(success, "Moved to trash");
		return { ...data };
	} catch (err) {
		console.error(err);
	}
};

/**
 * Restore note from trash
 * @param {string} noteId
 * @param {string} authToken
 * @return notes, trash
 */
export const restoreFromTrash = async (noteId, authToken) => {
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
		notify(success, "Note Restored");
		return { ...data };
	} catch (err) {
		console.error(err);
	}
};

/**
 * Delete note from trash
 * @param {string} noteId
 * @param {string} authToken
 * @return trash
 */
export const deleteFromTrash = async (noteId, authToken) => {
	try {
		const { data } = await axios.delete(`${API_DELETE_TRASH}/${noteId}`, {
			headers: {
				authorization: authToken,
			},
		});
		notify(success, "Note Deleted");
		return { ...data };
	} catch (err) {
		console.error(err);
	}
};
