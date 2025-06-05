import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteService';
import css from './NoteList.module.css';
import type {Note} from '../../types/note';

interface NoteListProps {
    search: string;
    page: number;
}

export default function NoteList({ search, page }: NoteListProps) {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes(page, 12, search),
        keepPreviousData: true,
    });

    const handleDelete = async (id: string) => {
        await deleteNote(id);
        queryClient.invalidateQueries({ queryKey: ['notes'] });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data?.notes.length) return <p>No notes found.</p>;

    return (
        <ul className={css.list}>
            {data.notes.map((note: Note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button className={css.button} onClick={() => handleDelete(note.id)}>
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}