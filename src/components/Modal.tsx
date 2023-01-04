import { ReactNode, useEffect, useMemo } from "react";
import styles from "./styles/Modal.module.css";
import ReactDOM from "react-dom";

export default function Modal({ children }: { children: ReactNode }) {
  const container = useMemo(() => document.createElement("div"), []);
  useEffect(() => {
    document.body.style.setProperty("overflow", "hidden");
    document.body.appendChild(container);
    return () => {
      document.body.style.removeProperty("overflow");
      container.remove();
    };
  }, [container]);

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>{children}</div>
    </div>,
    container
  );
}
