import { useRef } from "react";
import styles from "./Modal.module.scss";
import { useSpring, animated } from "react-spring";
// import clsx from "clsx";
function Modal({ children, showModal, setShowModal }) {
  const refModal = useRef(null);

  // ANIMATED
  const modalAnimation = useSpring({
    opacity: showModal ? 1 : 0,
    top: showModal ? "25%" : "0",
    config: { friction: 10 },
  });

  // METHOD
  function handleModal(e) {
    if (e.target === refModal.current) {
      setShowModal(false);
    }
  }

  return (
    showModal && (
      <div ref={refModal} className={styles.modal} onClick={handleModal}>
        <animated.div style={modalAnimation} className={styles.container}>
          {children}
        </animated.div>
      </div>
    )
  );
}
export default Modal;
