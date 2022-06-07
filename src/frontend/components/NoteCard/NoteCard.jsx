function NoteCard({ note, children }) {
	return (
		<article
			className="card rounded shadow border"
			style={{ backgroundColor: note.noteColor }}
		>
			<div className="card-body">
				<h3>{note.title}</h3>
				<p dangerouslySetInnerHTML={{ __html: note.description }} />
			</div>
			{children}
		</article>
	);
}
export default NoteCard;
