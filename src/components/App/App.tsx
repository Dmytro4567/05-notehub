import {useState} from 'react';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import NoteModal from '../NoteModal/NoteModal';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {fetchNotes} from '../../services/noteService';
import type {Note} from "../../types/note.ts";
import {useDebounce} from 'use-debounce';

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedSearch] = useDebounce(search, 500);

    const {
        data,
        isLoading,
        isError,
        isSuccess,
    } = useQuery<{ notes: Note[]; totalPages: number }>({
        queryKey: ['notes', page, debouncedSearch],
        queryFn: () => fetchNotes(page, 12, debouncedSearch),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={setSearch}/>
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
                <NoteList search={debouncedSearch} page={page}/>
            )}

            {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)}/>}
        </div>
    );
}
