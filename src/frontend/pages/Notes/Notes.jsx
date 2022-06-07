import {
	faArchive,
	faEdit,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteUpdateModal from "../../components/NoteUpdateModal/NoteUpdateModal";
import {
	ARCHIVE_NOTE,
	OPEN_NOTE_UPDATE_MODAL,
	TRASH_NOTE,
} from "../../constants/reducer-constants";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import { addToArchives } from "../../services/notes-archive-service";
import { addToTrash } from "../../services/notes-trash-service";
import { getFilteredNotes } from "../../utils/filter-utils";

function Notes() {
	const { user } = useAuth();
	const { notes, showNoteUpdateModal, filters, dispatch } = useNotes();

	const filteredNotes = getFilteredNotes(notes, filters);

	const handleNoteUpdate = (note) => {
		dispatch({
			type: OPEN_NOTE_UPDATE_MODAL,
			payload: { currentNote: note },
		});
	};

	const handleNoteArchive = async (e, note) => {
		e.preventDefault();
		const { notes, archives } = await addToArchives(note, user.token);
		dispatch({ type: ARCHIVE_NOTE, payload: { notes, archives } });
	};

	const handleNoteDelete = async (e, noteId) => {
		e.preventDefault();
		const { notes, trash } = await addToTrash(noteId, user.token);
		dispatch({ type: TRASH_NOTE, payload: { notes, trash } });
	};

	return (
		<>
			{filteredNotes.map((note) => (
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
						<button onClick={(e) => handleNoteArchive(e, note)}>
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
