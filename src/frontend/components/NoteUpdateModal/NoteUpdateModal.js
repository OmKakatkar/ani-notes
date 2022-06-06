import "./NoteUpdateModal.css";
import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import { CLOSE_NOTE_UPDATE_MODAL } from "../../constants/reducer-constants";
import Input from "../Input/Input";
import { updateNote } from "../../services/notes-service";
import { UPDATE_NOTE } from "../../constants/reducer-constants";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";

function NoteUpdateModal() {
	const { user } = useAuth();
	const { dispatch, currentNote } = useNotes();
	const { title, description, noteColor, priority, tags, _id } = currentNote;

	const [noteData, setNoteData] = useState({
		title: title,
		description: description,
		noteColor: noteColor,
		priority: priority,
		tags: tags,
		_id: _id,
	});

	const closeModal = (e) => {
		if (e.target.id === "modal") {
			dispatch({ type: CLOSE_NOTE_UPDATE_MODAL });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const resp = await updateNote(noteData, user.token);
		dispatch({ type: UPDATE_NOTE, payload: { notes: resp } });
	};

	const handleChange = (e) => {
		setNoteData({ ...noteData, [e.target.name]: e.target.value });
	};

	return (
		<div className="modal flex-container" id="modal" onClick={closeModal}>
			<div className="modal-body">
				<div className="text-white">
					<form onSubmit={handleSubmit}>
						<Input
							type="text"
							label="Title"
							name="title"
							value={noteData.title}
							handleChange={handleChange}
							classNames="text-white"
							required
						/>
						<div className="input-container">
							<label htmlFor="description">Description</label>
							<RichTextEditor
								value={noteData.description}
								onChange={(e) => setNoteData({ ...noteData, description: e })}
								name="description"
							/>
						</div>
						<Input
							type="color"
							label="Note Color"
							name="noteColor"
							value={noteData.noteColor}
							handleChange={handleChange}
							classNames="text-white"
						/>
						<div className="input-container">
							<label htmlFor="priority">Priority</label>
							<select
								name="priority"
								value={noteData.priority}
								onChange={handleChange}
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
						<Input
							type="text"
							label="Tag"
							name="tag"
							value={noteData.tags}
							handleChange={(e) =>
								setNoteData({ ...noteData, tags: [e.target.value] })
							}
							classNames="text-white"
						/>
						<button type="submit" className="btn rounded bd-blue">
							Update
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
export default NoteUpdateModal;
