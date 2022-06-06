import {
	faArchive,
	faEdit,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteUpdateModal from "../../components/NoteUpdateModal/NoteUpdateModal";
import {
	NOTES,
	OPEN_NOTE_UPDATE_MODAL,
} from "../../constants/reducer-constants";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import { deleteNotePermanent } from "../../services/notes-service";

function Notes() {
	const { user } = useAuth();
	const { notes, showNoteUpdateModal, dispatch } = useNotes();

	const handleNoteUpdate = (note) => {
		dispatch({
			type: OPEN_NOTE_UPDATE_MODAL,
			payload: { currentNote: note },
		});
	};

	const handleNoteDelete = async (e, noteId) => {
		e.preventDefault();
		const resp = await deleteNotePermanent(noteId, user.token);
		dispatch({ type: NOTES, payload: { notes: resp } });
	};
	return (
		<>
			{notes.map((note) => (
				<NoteCard key={note._id} note={note}>
					<div className="button-container">
						<button onClick={() => handleNoteUpdate(note)}>
							<FontAwesomeIcon icon={faEdit} className="text-white text-lg" />
						</button>
						<button onClick={(e) => handleNoteDelete(e, note._id)}>
							<FontAwesomeIcon
								icon={faTrashAlt}
								className="text-white text-lg"
							/>
						</button>
						<button>
							<FontAwesomeIcon
								icon={faArchive}
								className="text-white text-lg"
							/>
						</button>
					</div>
				</NoteCard>
			))}
			{showNoteUpdateModal && <NoteUpdateModal />}
		</>
	);
}
export default Notes;
