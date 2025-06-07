import css from './NoteList.module.css';
import type {Note} from '../../types/note';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteNote} from '../../services/noteService';
import {useState} from 'react';

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({notes}: NoteListProps) {
    const queryClient = useQueryClient();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onMutate: (id: number) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
    });

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    {deletingId === note.id ? (
                        <p>Deleting...</p>
                    ) : (
                        <>
                            <h2 className={css.title}>{note.title}</h2>
                            <p className={css.content}>{note.content}</p>
                            <div className={css.footer}>
                                <span className={css.tag}>{note.tag}</span>
                                <button
                                    className={css.button}
                                    onClick={() => mutate(note.id)}
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
