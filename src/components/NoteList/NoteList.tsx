import css from './NoteList.module.css';
import type {Note} from '../../types/note';

interface NoteListProps {
    notes: Note[];
    onDelete: (id: string) => void;
    deletingNoteId: string | null;
}

export default function NoteList({notes, onDelete, deletingNoteId}: NoteListProps) {
    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    {deletingNoteId === note.id ? (
                        <p>Deleting...</p>
                    ) : (
                        <>
                            <h2 className={css.title}>{note.title}</h2>
                            <p className={css.content}>{note.content}</p>
                            <div className={css.footer}>
                                <span className={css.tag}>{note.tag}</span>
                                <button
                                    className={css.button}
                                    onClick={() => onDelete(note.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}