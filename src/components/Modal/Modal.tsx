import type { FC, ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  body?: ReactNode;
  controls: ReactNode;
}
export const Modal: FC<ModalProps> = ({ title, body, controls }) => {
  return (
    <div className={styles.modal}>
      <h2>{title}</h2>
      {body}
      {controls}
    </div>
  );
};

export default Modal;
