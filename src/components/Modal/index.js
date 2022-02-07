import { useRef } from "react";
import clsx from "clsx";
import styles from "./Modal.module.scss";

function Modal({ children, showModal, setShowModal }) {
  const refModal = useRef(null);

  function handleModal(e) {
    if (e.target === refModal.current) {
      setShowModal(false);
    }
  }

  return (
    showModal && (
      <div ref={refModal} className={styles.modal} onClick={handleModal}>
        <div className={styles.container}>{children}</div>
      </div>
    )
  );
}
export default Modal;
