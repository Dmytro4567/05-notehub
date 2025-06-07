import {createPortal} from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';

interface NoteModalProps {
    onClose: () => void;
}

export default function NoteModal({onClose}: NoteModalProps) {
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
                <NoteForm onClose={onClose}/>
            </div>
        </div>,
        document.body
    );
}