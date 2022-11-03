import {
  faArchive,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import NoteCard from '../../components/NoteCard/NoteCard';
import NoteModal from '../../components/NoteModal/NoteModal';
import {
  ARCHIVE_NOTE,
  OPEN_NOTE_UPDATE_MODAL,
  TOGGLE_LOADING,
  TRASH_NOTE,
} from '../../constants/reducer-constants';
import { useAuth } from '../../context/auth-context';
import { useNotes } from '../../context/notes-context';
import { addToArchives } from '../../services/notes-archive-service';
import { addToTrash } from '../../services/notes-trash-service';
import { getFilteredNotes } from '../../utils/filter-utils';
import '../Masonry.css';
import { breakPoints } from '../../constants/masonry-constant';
import { NoteType } from '../../services/auth-service';

function Notes() {
  const { user } = useAuth();
  const { notes, showNoteModal, filters, dispatch, isLoading } = useNotes();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const filteredNotes = getFilteredNotes(notes, { ...filters, search });

  const handleNoteUpdate = (note: NoteType) => {
    dispatch({
      type: OPEN_NOTE_UPDATE_MODAL,
      payload: { currentNote: note },
    });
  };

  const handleNoteArchive = async (
    e: React.MouseEvent<HTMLButtonElement>,
    note: NoteType
  ) => {
    e.preventDefault();
    dispatch({ type: TOGGLE_LOADING });
    const { notes, archives } = await addToArchives(note, user.token);
    dispatch({ type: ARCHIVE_NOTE, payload: { notes, archives } });
    dispatch({ type: TOGGLE_LOADING });
  };

  const handleNoteDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    noteId: string
  ) => {
    e.preventDefault();
    dispatch({ type: TOGGLE_LOADING });
    const { notes, trash } = await addToTrash(noteId, user.token);
    dispatch({ type: TRASH_NOTE, payload: { notes, trash } });
    dispatch({ type: TOGGLE_LOADING });
  };

  return (
    <>
      <h1 className='text-white text-center text-xhuge pad-top-1r'>Notes</h1>
      {filteredNotes.length > 0 ? (
        <Masonry
          breakpointCols={breakPoints}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}>
              <div className='button-container'>
                <button
                  onClick={() => handleNoteUpdate(note)}
                  disabled={isLoading}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className='text-white text-lg'
                  />
                  <div className='button-tooltip'>Edit</div>
                </button>
                <button
                  onClick={(e) => handleNoteDelete(e, note._id!)}
                  disabled={isLoading}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className='text-white text-lg'
                  />
                  <div className='button-tooltip'>Delete</div>
                </button>
                <button
                  onClick={(e) => handleNoteArchive(e, note)}
                  disabled={isLoading}>
                  <FontAwesomeIcon
                    icon={faArchive}
                    className='text-white text-lg'
                  />
                  <div className='button-tooltip'>Archive</div>
                </button>
              </div>
            </NoteCard>
          ))}
        </Masonry>
      ) : (
        <p className='text-huge text-white text-center mg-top-2r'>
          It is so empty here...
        </p>
      )}
      {showNoteModal && <NoteModal />}
    </>
  );
}
export default Notes;
