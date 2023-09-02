import React from "react";
import useFetch from "../../Hooks/useFetch";
import { User } from "../../vite-env";
import UserRow from "./UserRow";
import usePagination from "../../Hooks/usePagination";
import { useSearchContext } from "../../Contexts/SearchContext";
import PageController from "./PageController";
import UserList from "./UserList";
import UserSearch from "./UserSearch";

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
  const [list, setList] = React.useState<User[] | null>(null);

  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = React.useState(5000 / itemsPerPage);
  const { page, goTo, nextPage, previousPage } = usePagination(totalPages);

  const search = useSearchContext();

  // Define qual a lista que será exibida. Primeiro, uma lista de 100 usuários é formada. Caso a lista do search seja carregada, ela será usada.
  React.useEffect(() => {
    if (data?.results) {
      setList(() => {
        return [...data.results];
      });
    }
    // Se a requisição de todos os usuários já tiver sido finalizada, os usuários exibidos serão atualizados.
    if (search.data?.results) {
      setList([...search.data.results]);
    }
  }, [data, search.data]);

  console.log(data?.results.length);
  // Executa uma requisição por mais usuários caso seja possível acessar uma página não carregada
  function requestMoreUsers(endPage: number) {
    if (list && endPage * itemsPerPage > list.length && list.length !== 5000) {
      // Caso os usuários não tenham sido carregados, novas requisições serão feitas de cem em cem usuários
      setUrl(
        `https://randomuser.me/api/?results=${list.length + 100}&seed=foobar`
      );
    }
  }

  if (list)
    return (
      <div>
        <UserSearch
          goTo={goTo}
          setTotalPages={setTotalPages}
          itemsPerPage={itemsPerPage}
        />
        <UserList
          users={search.users ? search.users : list}
          page={page}
          itemsPerPage={itemsPerPage}
        />
        <PageController
          previousPage={previousPage}
          nextPage={nextPage}
          goTo={goTo}
          page={page}
          totalPages={totalPages}
          requestMoreUsers={requestMoreUsers}
        />
      </div>
    );
  return <div></div>;
};

export default Home;
