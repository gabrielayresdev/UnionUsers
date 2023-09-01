import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSearchContext } from "../Contexts/SearchContext";
import { User } from "../vite-env";

const UserPage = () => {
  const params = useParams();
  const search = useSearchContext();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (params.id) {
      search.setSearchValue(params.id);
    }
  }, [search, params]);

  React.useEffect(() => {
    if (search.users?.length === 1) setUser(search.users[0]);
  }, [search.users]);

  if (user)
    return (
      <div>
        <Link to="/">Back</Link>
        <h1>{user.name.first}</h1>
      </div>
    );
  else return <div>Não encontrado</div>;
};

export default UserPage;
