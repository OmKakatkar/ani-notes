import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import { createNote } from "../../services/notes-service";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import { NOTES } from "../../constants/reducer-constants";
import { RichTextEditor } from "../RichTextEditor/RichTextEditor";
import { formatDate } from "../../../backend/utils/authUtils";

function CreateNote() {
	const { user } = useAuth();
	const { dispatch } = useNotes();
	const navigate = useNavigate();

	const [noteData, setNoteData] = useState({
		title: "",
		description: "",
		noteColor: "#a0a0a0",
		priority: "low",
		tags: [],
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		const resp = await createNote(
			{ ...noteData, createdAt: formatDate(), updatedAt: formatDate() },
			user.token
		);
		dispatch({ type: NOTES, payload: { notes: resp } });
		navigate("/");
	};

	const handleChange = (e) => {
		setNoteData({ ...noteData, [e.target.name]: e.target.value });
	};

	return (
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
					New
				</button>
			</form>
		</div>
	);
}
export default CreateNote;
