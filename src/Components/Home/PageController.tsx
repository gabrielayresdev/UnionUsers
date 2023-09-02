import React from "react";

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
    <div>
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
};

export default PageController;
