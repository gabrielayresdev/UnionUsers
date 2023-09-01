import React from "react";
import { User } from "../vite-env";
import useFetch from "../Hooks/useFetch";
import { Result } from "../Components/Home";

interface ISearchContext {
  users: User[] | null;
  data: Result;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = React.createContext<ISearchContext | null>(null);

export function useSearchContext() {
  const context = React.useContext(SearchContext);
  if (!context) throw new Error("useContext deve estar dentro do provider");
  return context;
}

const SearchContextProvider = ({ children }: React.PropsWithChildren) => {
  const [users, setUsers] = React.useState<User[] | null>(null);
  const { data, erro } = useFetch<Result>(
    "https://randomuser.me/api/?results=500&seed=foobar"
  );
  const [searchValue, setSearchValue] = React.useState<string>("");

  React.useEffect(() => {
    if (data) {
      const { results } = data;
      if (searchValue.length !== 0) {
        setUsers(() =>
          results.filter((u) => {
            return `${u.name.first} ${u.name.last}`
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
        );
      } else setUsers(null);
    }
  }, [searchValue, data]);

  return (
    <SearchContext.Provider
      value={{ users, data, searchValue, setSearchValue }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
