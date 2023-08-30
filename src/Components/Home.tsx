import React from "react";
import useFetch from "../Hooks/useFetch";
import { User } from "../vite-env";
import UserRow from "./UserRow";

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

interface Result {
  info: Info;
  results: User[];
}

const Home = () => {
  const { data, loading, erro } = useFetch<Result>(
    "https://randomuser.me/api/?results=100"
  );

  if (data)
    return data.results.map((user) => {
      return <UserRow user={user} key={user.id.value} />;
    });
  return <div></div>;
};

export default Home;
