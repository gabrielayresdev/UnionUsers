import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSearchContext } from "../../Contexts/SearchContext";
import { User } from "../../vite-env";

import styles from "./UserPage.module.sass";
import usePagination from "../../Hooks/usePagination";
import Info from "./sections/Info";
import UserPageLoading from "./UserPageLoading";
import ErrorPage from "../Errors/ErrorPage";

export type data = [string, string];
type sectionData = data[];

const UserPage = () => {
  const params = useParams();
  const search = useSearchContext();
  const [user, setUser] = React.useState<User | null>(null);
  const [sectionsData, setSectionsData] = React.useState<
    sectionData[] | null
  >();
  const { page, goTo } = usePagination(3);

  // Faz o search pelo id do usuário no searchContext
  React.useEffect(() => {
    if (params.id) {
      search.setSearchValue(params.id);
    }
  }, [search, params]);

  // Valores que serão exibidos na seção de informações
  React.useEffect(() => {
    if (search.users?.length === 1) {
      setUser(search.users[0]);
      if (user) {
        setSectionsData([
          [
            ["name", `${user.name.first} ${user?.name.last}`],
            ["gender", user.gender],
            ["age", `${user.dob.age} years`],
            ["phone", user.phone],
            ["cell", user.cell],
          ],
          [
            ["City", user.location.city],
            ["State", user.location.state],
            ["Country", user.location.country],
            ["Postcode", user.location.postcode],
            ["timezone", user.location.timezone.offset],
          ],
          [
            ["id", user.login.uuid],
            ["username", user.login.username],
            ["e-mail", user.email],
            ["password", user.login.password],
          ],
        ]);
      }
    }
  }, [search.users, user]);

  if (search.erro) return <ErrorPage error={search.erro} />;
  else if (search.loading) return <UserPageLoading />;
  else if (user)
    return (
      <div className={styles.userPage}>
        <Link to="/" className={styles.return}>
          Voltar
        </Link>
        <div className={styles.profileHeader}>
          <div className={styles.imageContainer}>
            <img src={user.picture.large} alt="Foto de perfil" />
          </div>
          <h1
            className={styles.name}
          >{`${user.name.first} ${user.name.last}`}</h1>
          <h2 className={styles.title}>{user.name.title}</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.pageController}>
            <button
              onClick={() => goTo(0)}
              className={page === 0 ? styles.active + "" : ""}
            >
              <span>Info</span>
            </button>
            <button
              onClick={() => goTo(1)}
              className={page === 1 ? styles.active : ""}
            >
              <span>Location</span>
            </button>
            <button
              onClick={() => goTo(2)}
              className={page === 2 ? styles.active : ""}
            >
              <span>Login</span>
            </button>
          </div>
          {sectionsData ? <Info data={sectionsData[page]} /> : null}
        </div>
      </div>
    );
};

export default UserPage;
