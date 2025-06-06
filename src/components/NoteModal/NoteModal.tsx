import {createPortal} from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';
import type {Note} from "../../types/note.ts";

interface NoteModalProps {
    onClose: () => void;
    onSubmit: (values: Pick<Note, 'title' | 'content' | 'tag'>) => Promise<void>;
}

export default function NoteModal({onClose, onSubmit}: NoteModalProps) {
    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={onClose}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
        >
            <div
                className={css.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <NoteForm onClose={onClose} onSubmit={onSubmit}/>
            </div>
        </div>,
        document.body
    );
}
