import React from "react";
import { useSearchContext } from "../../Contexts/SearchContext";

interface IUserSearch {
  goTo: (num: number) => void;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
}

const UserSearch = ({ goTo, setTotalPages, itemsPerPage }: IUserSearch) => {
  const search = useSearchContext();
  const goToRef = React.useRef(goTo);
  const cleansInputRef = React.useRef(() => search.setSearchValue(""));

  // Limpa o valor da pesquisa
  React.useEffect(() => {
    cleansInputRef.current();
  }, []);

  React.useEffect(() => {
    // Muda para a primeira página sempre que o valor do imput for alterado
    goToRef.current(0);
    if (search.searchValue) {
      setTotalPages(() => {
        if (search.users) {
          return Math.ceil(search.users.length / itemsPerPage);
        } else return 0;
      });
    } else setTotalPages(5000 / itemsPerPage);
  }, [search, setTotalPages, itemsPerPage]);

  return (
    <input
      type="text"
      value={search.searchValue}
      onChange={({ target }) => {
        search.setSearchValue(target.value);
      }}
    />
  );
};

export default UserSearch;
