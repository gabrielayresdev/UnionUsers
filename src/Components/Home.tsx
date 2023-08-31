import React from "react";
import useFetch from "../Hooks/useFetch";
import { User } from "../vite-env";
import UserRow from "./UserRow";
import usePagination from "../Hooks/usePagination";
import { useSearchContext } from "../Contexts/SearchContext";

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface Result {
  info: Info;
  results: User[];
}

interface Names {
  info: Info;
  results: {
    name: {
      title: string;
      first: string;
      last: string;
    };
  };
}

const Home = () => {
  const { data, loading, erro } = useFetch<Result>(
    "https://randomuser.me/api/?results=100&seed=foobar"
  );

  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = React.useState(0);
  const { page, goTo, nextPage, previousPage } = usePagination(totalPages);
  const { users, searchValue, setSearchValue } = useSearchContext();

  React.useEffect(() => {
    if (data?.results) {
      setTotalPages(data.results.length / itemsPerPage);
    }
  }, [data]);

  const [paginationButtons, setPaginationButtons] = React.useState<
    number[] | null
  >([0, 1, 2, 3, 4]);

  React.useEffect(() => {
    const visiblePages = 5;
    let startPage = Math.max(page, 0);
    const endPage = Math.min(startPage + visiblePages, totalPages) - 1;
    startPage = Math.max(endPage - visiblePages + 1, 0);
    console.log(startPage);

    setPaginationButtons(null);
    for (let index = startPage; index <= endPage; index++) {
      setPaginationButtons((current) => {
        console.log("Primeiro:", startPage);
        if (current !== null) {
          return [...current, index];
        } else {
          return [index];
        }
      });
    }
  }, [page, totalPages]);

  console.log(users);
  if (data)
    return (
      <div>
        <input
          type="text"
          value={searchValue}
          onChange={({ target }) => {
            setSearchValue(target.value);
          }}
        />
        {data.results
          .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
          .map((user, index) => {
            return <UserRow user={user} key={index} />;
          })}

        <button style={{ margin: "1rem" }} onClick={() => previousPage()}>
          Previous
        </button>
        {paginationButtons?.map((v) => {
          return (
            <button key={v} onClick={() => goTo(v)}>
              {v + 1}
            </button>
          );
        })}
        <button style={{ margin: "1rem" }} onClick={() => nextPage()}>
          Next
        </button>
      </div>
    );
  return <div></div>;
};

export default Home;
