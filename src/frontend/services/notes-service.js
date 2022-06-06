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

// TODO: Add a update function
