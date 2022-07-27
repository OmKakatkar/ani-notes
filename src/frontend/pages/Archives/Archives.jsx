import {
	faArrowAltCircleUp,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Masonry from "react-masonry-css";
import { useSearchParams } from "react-router-dom";
import NoteCard from "../../components/NoteCard/NoteCard";
import { breakPoints } from "../../constants/masonry-constant";
import {
	TOGGLE_LOADING,
	TRASH_NOTE,
	UNARCHIVE_NOTE,
} from "../../constants/reducer-constants";
import { success } from "../../constants/toast-constants";
import { useAuth } from "../../context/auth-context";
import { useNotes } from "../../context/notes-context";
import { restoreFromArchives } from "../../services/notes-archive-service";
import { addToTrash } from "../../services/notes-trash-service";
import { getFilteredNotes } from "../../utils/filter-utils";
import { notify } from "../../utils/notify";

function Archives() {
	const { user } = useAuth();
	const { archives, dispatch, filters, isLoading } = useNotes();
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search");
	const filteredNotes = getFilteredNotes(archives, { ...filters, search });

	const handleNoteDelete = async (e, noteId) => {
		e.preventDefault();
		dispatch({ type: TOGGLE_LOADING });
		const { notes: tempNotes, archives } = await restoreFromArchives(
			noteId,
			user.token
		);
		dispatch({ type: UNARCHIVE_NOTE, payload: { notes: tempNotes, archives } });
		const { notes, trash } = await addToTrash(noteId, user.token);
		dispatch({ type: TRASH_NOTE, payload: { notes, trash } });
		dispatch({ type: TOGGLE_LOADING });
	};

	const handleNoteUnarchive = async (e, noteId) => {
		e.preventDefault();
		dispatch({ type: TOGGLE_LOADING });
		const { notes, archives } = await restoreFromArchives(noteId, user.token);
		dispatch({ type: UNARCHIVE_NOTE, payload: { notes, archives } });
		notify(success, "Note Unarchived");
		dispatch({ type: TOGGLE_LOADING });
	};

	return (
		<>
			<h1 className="text-white text-center text-xhuge pad-top-1r">Notes</h1>
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
								</button>

								<button
									onClick={(e) => handleNoteUnarchive(e, note._id)}
									disabled={isLoading}
								>
									<FontAwesomeIcon
										icon={faArrowAltCircleUp}
										className="text-white text-lg"
									/>
								</button>
							</div>
						</NoteCard>
					))}
				</Masonry>
			) : (
				<h1 className="text-xhuge text-white text-center mg-top-2r">
					No Notes Found
				</h1>
			)}
		</>
	);
}
export default Archives;
