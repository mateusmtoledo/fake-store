import { useEffect } from 'react';
import styles from './styles/Modal.module.css';
import ReactDOM from 'react-dom';

export default function Modal({ children }) {
  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');
    return () => document.body.style.removeProperty('overflow');
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.getElementById('portal'),
  );
}
