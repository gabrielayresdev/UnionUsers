import { User } from "../../vite-env";
import { Link } from "react-router-dom";

import styles from "./UserRow.module.sass";
import { dateFormat } from "../../Helper/format";

const UserRow = ({ user }: { user: User }) => {
  return (
    <div className={styles.userRow}>
      <p>{user.id.value ? user.id.value : <i>null</i>}</p>
      <p>{user.name.first}</p>
      <p>{user.name.last}</p>
      <p>{user.name.title}</p>
      <p>{dateFormat(user.dob.date)}</p>
      <p>{user.dob.age}</p>
      <Link to={`/usuario/${user.login.uuid}`}>See profile</Link>
    </div>
  );
};

export default UserRow;
