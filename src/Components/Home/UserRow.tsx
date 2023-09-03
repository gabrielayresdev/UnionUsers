import React from "react";
import { User } from "../../vite-env";
import { Link } from "react-router-dom";

import styles from "./UserRow.module.sass";

const UserRow = ({ user }: { user: User }) => {
  return (
    <div className={styles.userRow}>
      <p>{user.id.value ? user.id.value : <i>null</i>}</p>
      <p>{user.name.first}</p>
      <p>{user.name.last}</p>
      <p>{user.name.title}</p>
      <p>{user.dob.date.toString()}</p>
      <p>{user.dob.age}</p>
      <Link to={`/usuario/${user.login.uuid}`}>See profile</Link>
    </div>
  );
};

export default UserRow;
