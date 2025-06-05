import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';

interface NoteModalProps {
    onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return createPortal(
        <div className={css.backdrop} onClick={onClose} role="dialog" aria-modal="true">
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <NoteForm onClose={onClose} />
            </div>
        </div>,
        document.body
    );
}