import {
	faArchive,
	faEdit,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteCard from "../../components/NoteCard/NoteCard";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";

function Notes() {
	const { user } = useAuth();
	const { notes } = useNotes();
	return (
		<>
			{notes.map((note) => (
				<NoteCard key={note._id} note={note}>
					<div className="button-container">
						<button>
							<FontAwesomeIcon icon={faEdit} className="text-white text-lg" />
						</button>
						<button>
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
		</>
	);
}
export default Notes;
