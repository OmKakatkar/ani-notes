import "./NoteCard.css";

function NoteCard({ note, children }) {
	return (
		<article
			className="card rounded shadow border"
			style={{ backgroundColor: note.noteColor }}
		>
			<div className="card-body">
				{note.tags.length > 0 && <span className="tag">{note.tags[0]}</span>}
				<h3 className="text-huge">{note.title}</h3>
				<p
					className="text-sm"
					dangerouslySetInnerHTML={{ __html: note.description }}
				/>
				<span>{new Date(note.createdAt).toLocaleString()}</span>
			</div>
			{children}
		</article>
	);
}
export default NoteCard;
