import React from "react";

import ChevronLeft from "../../assets/chevron-left-solid.svg";
import ChevronRight from "/src/assets/chevron-right-solid.svg";

import styles from "./PageController.module.sass";

interface IPageController {
  previousPage: VoidFunction;
  nextPage: VoidFunction;
  goTo: (num: number) => void;
  page: number;
  totalPages: number;
  requestMoreUsers: (num: number) => void;
}

const PageController = ({
  previousPage,
  nextPage,
  goTo,
  page,
  totalPages,
  requestMoreUsers,
}: IPageController) => {
  const [paginationButtons, setPaginationButtons] = React.useState<number[]>([
    0, 1, 2, 3, 4,
  ]);

  // Define os valores dos botões da paginação e executa uma requisição por mais usuários caso seja possível acessar uma página não carregada
  React.useEffect(() => {
    const visiblePages = 5;
    let startPage = Math.max(page, 0);
    const endPage = Math.min(startPage + visiblePages, totalPages) - 1;
    startPage = Math.max(endPage - visiblePages + 1, 0);

    setPaginationButtons([]);
    for (let index = startPage; index <= endPage; index++) {
      setPaginationButtons((current) => {
        return [...current, index];
      });
    }

    requestMoreUsers(endPage);
  }, [page, totalPages, requestMoreUsers]);

  return (
    <div className={styles.controller}>
      <button className={styles.button} onClick={() => previousPage()}>
        <img src={ChevronLeft} alt="Previous page" />
      </button>
      {paginationButtons?.map((v) => {
        return (
          <button
            className={`${styles.button} ${page === v ? styles.active : ""}`}
            key={v}
            onClick={() => goTo(v)}
          >
            {v + 1}
          </button>
        );
      })}
      <button className={styles.button} onClick={() => nextPage()}>
        <img src={ChevronRight} alt="" />
      </button>
    </div>
  );
};

export default PageController;
