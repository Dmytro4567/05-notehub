import { useState } from 'react';
import { createPortal } from 'react-dom';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import NoteModal from '../NoteModal/NoteModal';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import { useDebounce } from 'use-debounce';

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);
    const [debouncedSearch] = useDebounce(search, 500);
    const queryClient = useQueryClient();
    const perPage = 12;

    const {
        data,
        isLoading,
        isError,
        isSuccess,
    } = useQuery<{ notes: Note[]; totalPages: number }>({
        queryKey: ['notes', page, debouncedSearch, perPage],
        queryFn: () => fetchNotes(debouncedSearch, page, perPage),
        placeholderData: keepPreviousData,
    });

    const handleDelete = async (id: number) => {
        setDeletingNoteId(id);
        await deleteNote(id);
        await queryClient.invalidateQueries({ queryKey: ['notes'] });
        setDeletingNoteId(null);
    };

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={setSearch} />
                {isSuccess && data.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        onPageChange={setPage}
                        totalPages={data.totalPages}
                    />
                )}
                <button className={css.button} onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </header>

            {isLoading && <p>Loading notes...</p>}
            {isError && <p>Error loading notes. Please try again later.</p>}

            {isSuccess && data.notes.length > 0 && (
                <NoteList
                    notes={data.notes}
                    onDelete={handleDelete}
                    deletingNoteId={deletingNoteId}
                />
            )}

            {isModalOpen &&
                createPortal(
                    <NoteModal onClose={() => setIsModalOpen(false)} />,
                    document.body
                )}
        </div>
    );
}
