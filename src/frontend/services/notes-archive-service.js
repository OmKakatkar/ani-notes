import axios from "axios";
import {
	API_DELETE_ARCHIVES,
	API_GET_ARCHIVES,
	API_POST_ARCHIVES,
	API_RESTORE_ARCHIVES,
} from "../constants/api-constant";
import { success } from "../constants/toast-constants";
import { notify } from "../utils/notify";

/**
 * Get archive notes
 * @param {string} authToken
 * @return archives
 */
export const getArchiveNotes = async (authToken) => {
	try {
		const { data } = await axios.get(API_GET_ARCHIVES, {
			headers: {
				authorization: authToken,
			},
		});
		return data.archives;
	} catch (err) {
		console.error(err);
	}
};

/**
 * Add a note to archives
 * @param {string} noteId
 * @param {string} authToken
 * @return notes, archives
 */
export const addToArchives = async (note, authToken) => {
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
		notify(success, "Note Archived");
		return { ...data };
	} catch (err) {
		console.error(err);
	}
};

/**
 * Unarchive note
 * @param {string} noteId
 * @param {string} authToken
 * @return notes, archives
 */
export const restoreFromArchives = async (noteId, authToken) => {
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
export const deleteFromArchives = async (noteId, authToken) => {
	try {
		const { data } = await axios.delete(`${API_DELETE_ARCHIVES}/${noteId}`, {
			headers: {
				authorization: authToken,
			},
		});
		notify(success, "Moved to trash");
		console.log(data);
		return { ...data };
	} catch (err) {
		console.error(err);
	}
};
