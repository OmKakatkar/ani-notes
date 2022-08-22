import { faTrashAlt, faTrashRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Masonry from "react-masonry-css";
import { useSearchParams } from "react-router-dom";
import NoteCard from "../../components/NoteCard/NoteCard";
import { breakPoints } from "../../constants/masonry-constant";
import {
	RESTORE_NOTE,
	TOGGLE_LOADING,
	TRASH,
} from "../../constants/reducer-constants";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import {
	deleteFromTrash,
	restoreFromTrash,
} from "../../services/notes-trash-service";
import { getFilteredNotes } from "../../utils/filter-utils";

function Trash() {
	const { user } = useAuth();
	const { trash, dispatch, filters, isLoading } = useNotes();
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search");
	const filteredNotes = getFilteredNotes(trash, { ...filters, search });

	const handleNoteDelete = async (e, noteId) => {
		e.preventDefault();
		dispatch({ type: TOGGLE_LOADING });
		const { trash } = await deleteFromTrash(noteId, user.token);
		dispatch({ type: TRASH, payload: { trash } });
		dispatch({ type: TOGGLE_LOADING });
	};

	const handleNoteRestore = async (e, noteId) => {
		e.preventDefault();
		dispatch({ type: TOGGLE_LOADING });
		const { notes, trash } = await restoreFromTrash(noteId, user.token);
		dispatch({ type: RESTORE_NOTE, payload: { notes, trash } });
		dispatch({ type: TOGGLE_LOADING });
	};

	return (
		<>
			<h1 className="text-white text-center text-xhuge pad-top-1r">Trash</h1>
			{filteredNotes.length > 0 ? (
				<Masonry
					breakpointCols={breakPoints}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{filteredNotes.map((note) => (
						<NoteCard key={note._id} note={note}>
							<div className="button-container">
								<button
									onClick={(e) => handleNoteDelete(e, note._id)}
									disabled={isLoading}
								>
									<FontAwesomeIcon
										icon={faTrashAlt}
										className="text-white text-lg"
									/>
									<div className="button-tooltip">Delete Forever</div>
								</button>

								<button
									onClick={(e) => handleNoteRestore(e, note._id)}
									disabled={isLoading}
								>
									<FontAwesomeIcon
										icon={faTrashRestore}
										className="text-white text-lg"
									/>
									<div className="button-tooltip">Restore</div>
								</button>
							</div>
						</NoteCard>
					))}
				</Masonry>
			) : (
				<p className="text-huge text-white text-center mg-top-2r">
					Trash is empty
				</p>
			)}
		</>
	);
}
export default Trash;
