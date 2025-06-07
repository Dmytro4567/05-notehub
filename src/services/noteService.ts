import axios from 'axios';
import type {Note} from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

export const fetchNotes = async (
    search: string,
    page: number,
    perPage = 12
): Promise<{ notes: Note[]; totalPages: number }> => {
    const params: Record<string, string | number> = {
        page,
        perPage,
    };

    if (search.trim()) {
        params.search = search;
    }

    const response = await instance.get<{ notes: Note[]; totalPages: number }>(
        '/notes',
        {params}
    );
    return response.data;
};

export const createNote = async (
    noteData: Omit<Note, 'id'>
): Promise<Note> => {
    const response = await instance.post<Note>('/notes', noteData);
    return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
    const response = await instance.delete<Note>(`/notes/${id}`);
    return response.data;
};
