import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';
import * as React from 'react';

interface NoteModalProps {
    onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        backdropRef.current?.focus();

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return createPortal(
        <div
            ref={backdropRef}
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                if (e.target === e.currentTarget) onClose();
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Escape') onClose();
            }}
        >
            <div className={css.modal}>
                <NoteForm onClose={onClose} />
            </div>
        </div>,
        document.body
    );
}
