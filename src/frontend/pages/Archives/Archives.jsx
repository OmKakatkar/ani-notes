import {
	faArrowAltCircleUp,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteCard from "../../components/NoteCard/NoteCard";
import { TRASH_NOTE, UNARCHIVE_NOTE } from "../../constants/reducer-constants";
import { success } from "../../constants/toast-constants";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import { restoreFromArchives } from "../../services/notes-archive-service";
import { addToTrash } from "../../services/notes-trash-service";
import { notify } from "../../utils/notify";

function Archives() {
	const { user } = useAuth();
	const { archives, dispatch } = useNotes();

	const handleNoteDelete = async (e, noteId) => {
		e.preventDefault();
		const { notes: tempNotes, archives } = await restoreFromArchives(
			noteId,
			user.token
		);
		dispatch({ type: UNARCHIVE_NOTE, payload: { notes: tempNotes, archives } });
		const { notes, trash } = await addToTrash(noteId, user.token);
		dispatch({ type: TRASH_NOTE, payload: { notes, trash } });
	};

	const handleNoteUnarchive = async (e, noteId) => {
		e.preventDefault();
		const { notes, archives } = await restoreFromArchives(noteId, user.token);
		dispatch({ type: UNARCHIVE_NOTE, payload: { notes, archives } });
		notify(success, "Note Unarchived");
	};

	return (
		<>
			{archives.map((note) => (
				<NoteCard key={note._id} note={note}>
					<div className="button-container">
						<button onClick={(e) => handleNoteDelete(e, note._id)}>
							<FontAwesomeIcon
								icon={faTrashAlt}
								className="text-white text-lg"
							/>
						</button>

						<button onClick={(e) => handleNoteUnarchive(e, note._id)}>
							<FontAwesomeIcon
								icon={faArrowAltCircleUp}
								className="text-white text-lg"
							/>
						</button>
					</div>
				</NoteCard>
			))}
		</>
	);
}
export default Archives;
