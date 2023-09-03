import styles from "./ErrorPage.module.sass";
import { Link } from "react-router-dom";
import HouseIcon from "/src/assets/house-solid.svg";
// Página de erro
const ErrorPage = ({ error }: { error: Error | null }) => {
  return (
    <div className={styles.error}>
      <h1 className={styles.error_title}>
        {error ? (
          <span>
            {error.name[0]}
            <span>{error.name[1]}</span>
            {error.name[2]}
          </span>
        ) : (
          <span>
            4<span>0</span>4
          </span>
        )}
      </h1>
      <p>
        {error
          ? error.message
          : `Oops! The page you were looking for couldn't be found. How about
        returning to the homepage?`}
      </p>
      <Link to="/" className={styles.error_button}>
        <button>
          Back to home <img src={HouseIcon} />
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
