import React, { useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { useNotes } from '../../context/notes-context';
import {
  CLOSE_NOTE_UPDATE_MODAL,
  NOTES,
} from '../../constants/reducer-constants';
import Input from '../Input/Input';
import { createNote, updateNote } from '../../services/notes-service';
import { UPDATE_NOTE } from '../../constants/reducer-constants';
import { RichTextEditor } from '../RichTextEditor/RichTextEditor';
import './NoteModal.css';
import { formatDate } from '../../utils/auth-utlis';

function NoteUpdateModal() {
  const { user } = useAuth();
  const { dispatch, currentNote } = useNotes();
  const [noteData, setNoteData] = useState(currentNote);

  const closeModal = (e: React.MouseEvent<EventTarget>) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      dispatch({ type: CLOSE_NOTE_UPDATE_MODAL });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentNote.title === '') {
      const resp = await createNote(
        { ...noteData, createdAt: formatDate(), updatedAt: formatDate() },
        user.token
      );
      dispatch({ type: NOTES, payload: { notes: resp } });
      dispatch({ type: CLOSE_NOTE_UPDATE_MODAL });
    } else {
      const resp = await updateNote(
        { ...noteData, updatedAt: formatDate() },
        user.token
      );
      dispatch({ type: UPDATE_NOTE, payload: { notes: resp } });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className='modal flex-container'
      id='modal'
      onClick={closeModal}>
      <div className='modal-body'>
        <div className='text-white'>
          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              label='Title'
              name='title'
              value={noteData.title}
              handleChange={handleChange}
              classNames='text-white'
              required
            />
            <div className='input-container'>
              <label htmlFor='description'>Description</label>
              <RichTextEditor
                value={noteData.description}
                onChange={(content) =>
                  setNoteData({ ...noteData, description: content })
                }
              />
            </div>
            <Input
              type='color'
              label='Note Color'
              name='noteColor'
              value={noteData.noteColor}
              handleChange={handleChange}
              classNames='text-white'
            />
            <div className='input-container'>
              <label htmlFor='priority'>Priority</label>
              <select
                name='priority'
                value={noteData.priority}
                onChange={handleChange}>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>
            <Input
              type='text'
              label='Tag'
              name='tag'
              value={noteData.tags}
              handleChange={(e) =>
                setNoteData({ ...noteData, tags: [e.target.value] })
              }
              classNames='text-white'
            />
            <button
              type='submit'
              className='btn rounded bd-blue'>
              {currentNote.title === '' ? 'Add' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default NoteUpdateModal;
