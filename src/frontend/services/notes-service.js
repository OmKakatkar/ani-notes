import axios from "axios";
import { API_NOTES } from "../constants/api-constant";
import { success } from "../constants/toast-constants";
import { notify } from "../utils/notify";

/**
 * Create new note
 * @param {object} noteData
 * @param {string} authToken
 * @return notes
 */
export const createNote = async (note, authToken) => {
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
		notify(success, "New Note Created!");
		return data.notes;
	} catch (err) {
		console.error(err);
	}
};

/**
 * Get all notes
 * @param {string} authToken
 * @return notes
 */
export const getAllNotes = async (authToken) => {
	try {
		const { data } = await axios.get(API_NOTES, {
			headers: {
				authorization: authToken,
			},
		});
		return data.notes;
	} catch (err) {
		console.error(err);
	}
};

/**
 * Update note
 * @param {string} authToken
 * @param {object} note
 * @return notes
 */
export const updateNote = async (note, authToken) => {
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
		notify(success, "Note Updated!");
		return data.notes;
	} catch (err) {
		console.error(err);
	}
};

/**
 * Delete note permanantly
 * @param {string} authToken
 * @param {string} noteId
 * @return notes
 */
export const deleteNotePermanent = async (noteId, authToken) => {
	try {
		const { data } = await axios.delete(`${API_NOTES}/${noteId}`, {
			headers: {
				authorization: authToken,
			},
		});
		notify(success, "Note Deleted!");
		return data.notes;
	} catch (err) {
		console.error(err);
	}
};
