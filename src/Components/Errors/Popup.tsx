import React from "react";
import styles from "./Popup.module.sass";
import closeIcon from "/src/assets/xmark-solid.svg";

const Popup = ({ message }: { message: string }) => {
  const erroRef = React.useRef<HTMLDivElement>(null);

  function closeError() {
    if (erroRef.current) {
      erroRef.current.remove();
    }
  }

  return (
    <div ref={erroRef} className={styles.popup}>
      <p>{message}</p>
      <button onClick={closeError}>
        <img src={closeIcon} alt="Fechar" />
      </button>
    </div>
  );
};

export default Popup;
