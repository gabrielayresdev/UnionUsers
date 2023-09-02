import React, { Fragment } from "react";
import styles from "./Info.module.sass";

import { data } from "../UserPage";

const Info = ({ data }: { data: data[] }) => {
  return (
    <dl className={styles.info}>
      {data.map(([title, value]) => {
        return (
          <Fragment key={title}>
            <dt>{title}</dt>
            <dd>{value}</dd>
          </Fragment>
        );
      })}
    </dl>
  );
};

export default Info;
