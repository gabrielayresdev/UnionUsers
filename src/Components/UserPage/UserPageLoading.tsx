import React from "react";
import styles from "./UserPageLoading.module.sass";

const UserPageLoading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.image}></div>
      <div className={styles.name}></div>
      <div className={styles.title}></div>
      <div className={styles.line}></div>
      <div className={styles.container}>
        <div className={styles.controller}>
          <div className={styles.control}></div>
          <div className={styles.control}></div>
          <div className={styles.control}></div>
        </div>
        <div className={styles.data}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default UserPageLoading;
