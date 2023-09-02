import React from "react";
import UserRow from "./UserRow";
import { User } from "../../vite-env";

interface IUserList {
  users: User[];
  page: number;
  itemsPerPage: number;
}

const UserList = ({ users, page, itemsPerPage }: IUserList) => {
  return (
    <div>
      {users
        .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
        .map((user, index) => {
          return <UserRow user={user} key={index} />;
        })}
    </div>
  );
};

export default UserList;
