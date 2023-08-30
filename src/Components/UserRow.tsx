import React from "react";
import { User } from "../vite-env";

const UserRow = ({ user }: { user: User }) => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <p>{user.id.value}</p>
      <p>{user.name.first}</p>
      <p>{user.name.last}</p>
      <p>{user.dob.date.toString()}</p>
      <p>{user.dob.age}</p>
    </div>
  );
};

export default UserRow;
