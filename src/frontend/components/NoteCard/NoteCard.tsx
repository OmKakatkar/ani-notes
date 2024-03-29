import { NoteType } from '../../services/auth-service';
import './NoteCard.css';

type NoteCardProps = {
  note: NoteType;
  children: React.ReactNode;
};

function NoteCard({ note, children }: NoteCardProps) {
  return (
    <article
      className='card rounded shadow border'
      style={{ backgroundColor: note.noteColor }}>
      <div className='card-body'>
        {note.tags.length > 0 && <span className='tag'>{note.tags[0]}</span>}{' '}
        {<span className='tag'>{note.priority}</span>}
        <h3 className='text-huge'>{note.title}</h3>
        <p
          className='text-sm'
          dangerouslySetInnerHTML={{ __html: note.description }}
        />
        <span>{new Date(note.updatedAt).toLocaleString()}</span>
      </div>
      {children}
    </article>
  );
}
export default NoteCard;
