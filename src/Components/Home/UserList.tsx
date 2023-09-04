import React from "react";
import UserRow from "./UserRow";
import { User } from "../../vite-env";

import styles from "./UserList.module.sass";

interface IUserList {
  users: User[];
  page: number;
  itemsPerPage: number;
}

const UserList = ({ users, page, itemsPerPage }: IUserList) => {
  return (
    <div className={styles.table}>
      <div className={styles.tHead}>
        <p>ID</p>
        <p>First Name</p>
        <p className={styles.mobileHidden}>Last Name</p>
        <p className={styles.mobileHidden}>Title</p>
        <p className={styles.mobileHidden}>Date</p>
        <p className={styles.mobileHidden}>Age</p>
        <p>Actions</p>
      </div>
      <div className={styles.tBody}>
        {users
          .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
          .map((user, index) => {
            return <UserRow user={user} key={index} />;
          })}
      </div>
    </div>
  );
};

export default UserList;
