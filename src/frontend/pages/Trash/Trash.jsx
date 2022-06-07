import { faTrashAlt, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteCard from "../../components/NoteCard/NoteCard";
import { RESTORE_NOTE, TRASH } from "../../constants/reducer-constants";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import {
	deleteFromTrash,
	restoreFromTrash,
} from "../../services/notes-trash-service";

function Trash() {
	const { user } = useAuth();
	const { trash, dispatch } = useNotes();

	const handleNoteDelete = async (e, noteId) => {
		e.preventDefault();
		const { trash } = await deleteFromTrash(noteId, user.token);
		dispatch({ type: TRASH, payload: { trash } });
	};

	const handleNoteRestore = async (e, noteId) => {
		e.preventDefault();
		const { notes, trash } = await restoreFromTrash(noteId, user.token);
		dispatch({ type: RESTORE_NOTE, payload: { notes, trash } });
	};

	return (
		<>
			{trash.map((note) => (
				<NoteCard key={note._id} note={note}>
					<div className="button-container">
						<button onClick={(e) => handleNoteDelete(e, note._id)}>
							<FontAwesomeIcon
								icon={faTrashAlt}
								className="text-white text-lg"
							/>
						</button>

						<button onClick={(e) => handleNoteRestore(e, note._id)}>
							<FontAwesomeIcon
								icon={faTrashRestore}
								className="text-white text-lg"
							/>
						</button>
					</div>
				</NoteCard>
			))}
		</>
	);
}
export default Trash;
