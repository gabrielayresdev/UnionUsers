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
  const [url, setUrl] = React.useState(
    "https://randomuser.me/api/?results=100&seed=foobar"
  );
  const { data, loading, erro } = useFetch<Result>(url);

  const itemsPerPage = 10;
  const totalPages = 5000 / itemsPerPage;
  const { page, goTo, nextPage, previousPage } = usePagination(totalPages);
  const search = useSearchContext();
  const [list, setList] = React.useState<User[] | null>(null);

  React.useEffect(() => {
    if (data?.results) {
      setList(() => {
        return [...data.results];
      });
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

    setPaginationButtons(null);
    for (let index = startPage; index <= endPage; index++) {
      setPaginationButtons((current) => {
        if (current !== null) {
          return [...current, index];
        } else {
          return [index];
        }
      });
    }

    if (list && endPage * itemsPerPage > list.length && list.length !== 5000) {
      {
        // Caso os usuários não tenham sido carregados, novas requisições serão feitas de cem em cem usuários
        console.log("Carreguei mais usuários");
        setUrl(
          `https://randomuser.me/api/?results=${list.length + 100}&seed=foobar`
        );
      }
    }
  }, [page, totalPages, list]);

  React.useEffect(() => {
    // Se a requisição de todos os usuários já tiver sido finalizada, os usuários exibidos serão atualizados
    if (search.data?.results) {
      console.log(search.data.results.length);
      setList(() => {
        return [...search.data.results];
      });
    }
  }, [search.data]);

  if (list)
    return (
      <div>
        <input
          type="text"
          value={search.searchValue}
          onChange={({ target }) => {
            search.setSearchValue(target.value);
          }}
        />
        {list
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
